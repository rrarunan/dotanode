module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'src',
		  keepalive: true
        }
	  }
	},
	bgShell: {
      _defaults: {
        bg: true
      },
	  runNode: {
		cmd: 'node src/server/serve.js',
		bg: true
	  }
	}
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bg-shell');

  // Server task
  grunt.registerTask('serve', ['bgShell:runNode', 'connect']);

};