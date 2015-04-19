module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            options: {
                force: true
            },
            dist: [ 'gllry.min.js', 'gllry.min.css' ]
        },
        copy: {
            dist: {
                files: [
                    {
                        src: [
                            'src/js/gllry.min.js'
                        ],
                        dest: 'gllry.min.js'
                    },
                    {
                        src: [
                            'src/css/gllry.min.css'
                        ],
                        dest: 'gllry.min.css'
                    }
                ]
            }
        },
        watch: {
            all: {
                files: ['app/*.js', 'app/**/*.js'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: '.'
                }
            }
        },
        uglify: {
            app: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'gllry.map'
                },
                files: {
                    'gllry.min.js': ['src/js/*.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css', '!*.min.css'],
                    dest: './',
                    ext: '.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('server',['connect', 'watch']);
    grunt.registerTask('dist',['clean', 'uglify', 'cssmin']);
};
