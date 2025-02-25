const { exec } = require('child_process');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
            dist: ['dist/']
		},
		copy: {
			images: {
				expand: true,
				cwd: 'assets/',
				src: ['*.svg'],
				dest: 'dist/'
			}
		}
	});

	grunt.registerTask('postcss-cli', 'Run PostCSS CLI', function() {
        const done = this.async();
        exec('npx postcss assets/oag.css --use postcss-nested --use postcss-custom-properties --use autoprefixer --use cssnano -o dist/oag.min.css --no-map', (err, stdout, stderr) => {
			
            if (err) {
                grunt.log.error(stderr);
                done(false);
            } else {
                grunt.log.writeln(stdout);
            }
        });
    });

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['clean', 'copy', 'postcss-cli']);
};
