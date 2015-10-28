module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        clean: ["dist/build.*"],
        'angular-builder': {
            options: {
                mainModule: 'AngularHelloJs',
                externalModules: 'ezfb',
                releaseBuild: {
                    renameModuleRefs: true
                }
            },
            app: {
                src: 'src/scripts/**/*.js',
                dest: 'dist/build/SaxAngularHelloJs.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/build/SaxAngularHelloJs.min.js': ['dist/build/*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-angular-builder');

    grunt.registerTask('default', ['clean', 'angular-builder', 'uglify:build']);

};