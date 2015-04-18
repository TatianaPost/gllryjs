module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            dist: {
                files: [
                    {
                        src: [
                            'app/templates/dist/index.html'
                        ],
                        dest: 'dist/index.html'
                    },
                    {
                        expand: true,
                        cwd: 'app/fonts/',
                        src: '*',
                        dest: 'dist/fonts/'
                    },
                    {
                        expand: true,
                        cwd: 'app/images/',
                        src: '*',
                        dest: 'dist/images/'
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
                    sourceMapName: 'dist/js/app.map'
                },
                files: {
                    'dist/js/app.min.js': ['app/js/app/**/*.js']
                }
            },
            libs: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'dist/js/vendor.map'
                },
                files: {
                    'dist/js/vendor.min.js': ['app/js/libs/*js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    grunt.registerTask('server',['connect', 'watch']);
};
