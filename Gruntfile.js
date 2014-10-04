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
  }
  });

  // Load the plugin that provides the "connect" task.
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Server task
  grunt.registerTask('serve', ['connect']);

};