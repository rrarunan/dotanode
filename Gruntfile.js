module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		connect : {
			server : {
				options : {
					port : 9001,
					base : 'src',
					keepalive : true
				}
			}
		},
		bgShell : {
			_defaults : {
				bg : true
			},
			runNode : {
				//TODO: don't hardcode API key here
				cmd : 'node src/server/serve.js 42E379CD222A1D2B33E92A1E1816C2C6',
				bg : true
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-bg-shell');

	// Server task
	grunt.registerTask('serve', ['bgShell:runNode', 'connect']);

};
