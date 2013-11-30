# This rakefile:
# -compiles coffee scripts
# -compiles templates as specified in wtf.js
# -compiles stylus styles
# -eventually cleans up web to be a dist only thinger
# html page compiler....
# so test pages don't have to copy-paste header code...

# TODO: going to want to compile to a dist dir or something...
# So need generational targets that only generate if there are changes...

# TODO: Update targets to only generate out of date files
	

require 'rake'

myDir = Dir.pwd

# Template Pre-compile plan:
# -Descend into plugins/ui/some_plugin/templates
# 	for every plugin
# -compile all templates found there
# -place them into Templates.js as:
# 	return {
# 		template1FileName: Handlebars.template(PRE-COMPILED-TEMPLATE),
# 		template2FileName: ...
# 	}
# -place Templates.js into the plugin's
# 	scripts directory.
task :compileTpls, :pretty, :dirChanged do |t, args|

	def compileTemplate (filename, args)

		pretty = args[:pretty]
		puts "Processing: #{filename}"
		compiledTemplates = '''
		define(["vendor/handlebars"], function(Handlebars) {
			return {
		'''

		first = true
		FileList["#{filename}/*.html"].each do |fname|
			pipe = IO.popen("handlebars -s #{fname}")
			result = pipe.readlines
			pipe.close


			joined = result.join
			if not pretty == "pretty" and not pretty == "p"
				joined = joined.gsub(/\\r\\n|\n|\\n/, "");
			end

			templateFileName = File.basename(fname, ".html");

			if first
				compiledTemplates += "\n\"#{templateFileName}\": Handlebars.template(#{joined})"
				first = false
			else
				compiledTemplates += ",\n\"#{templateFileName}\": Handlebars.template(#{joined})"
			end
  		end

  		puts "#{filename}/../../Templates.js"
  		File.open("#{filename}/../../Templates.js", 'w') {|f|
  			f.write(compiledTemplates)
  			f.write("\n}});");
  		}
	end


	#to start out this filename is going to need to be an absolute path to the 
	#direcotry containing the templates changed
	dirName = args[:dirChanged]

	if dirName

		compileTemplate(myDir + "/" + dirName, args)

	else

		puts "hello im gonna try adn compile shit" + myDir
		FileList[myDir + "/public/javascripts/plugins/*/view/res/templates"].each do |filename|
			puts "going to compile " + filename
			compileTemplate(filename, args)
		end

	end
	
end #task compile Templates


task :watchTpls do

system %{node ./templateWatcher.js}

end #task watch templates



task :compileStylus do
end

task :compileDocs do
	system %{yuidoc web/scripts -o ./docs}
end

task :compileCoffee, :watch do |t,args|
	watch = ""
	if args[:watch]
		watch = "--watch"
	end

	system %{coffee #{watch} -b --compile public/javascripts}
end

task :refactor, :source, :destination do |t, args|
	source = args[:source]
	destination = args[:destination]

	if !destination
		puts "usage: rake refactor[source,destination]"
		exit
	end

	FileList["./**/*.js"].each do |fname|
		#puts fname
		pipe = IO.popen("amdRefactor #{source} < #{fname}")
		result = pipe.readlines
		pipe.close

		if result.length > 0
			# line col_start col_end
			importLoc = result[0].split(",")
			line = Integer(importLoc[0]) - 1
			colStart = Integer(importLoc[1]) - 1
			colEnd = Integer(importLoc[2])

			lines = File.readlines(fname);
			theLine = lines[line]
			theLine = 
				"#{theLine[0..colStart]}#{destination}#{theLine[colEnd..theLine.length]}"

			lines[line] = theLine

			puts "Refactoring: #{fname}"
			File.open(fname, 'w') { |f| f << lines }
			#puts lines
		end
	end
end

task :showDeps, :package do |t, args|
	myPkg = args[:package]

	if !myPkg
		puts "usage: rake showDeps[package]"
		exit
	end

	FileList["web/scripts/#{myPkg}/**/*.js"].each do |fname|
		pipe = IO.popen("amdDeps #{myPkg} < #{fname}")
		result = pipe.readlines
		pipe.close

		if result.length > 0
			puts result
		end
	end
end

# TODO: need to specify dependencies
# and also need to not run if no changes
task :dist do
	system %{rsync -r --exclude='.git' --exclude='webgl*' --exclude='ghost*' --exclude='isis*' --exclude='mast*' web/ dist/}
	myDir = Dir.pwd
	FileList["web/**/*.js"].each do |filename|
		destFilename = filename[3..filename.length]
		system %{java -jar /Users/mattcrinklaw/opt/closure-compiler/compiler.jar --js=#{myDir}/#{filename} --js_output_file=#{myDir}/dist/#{destFilename}}
		puts "#{myDir}/dist/#{destFilename}"
	end
end
