/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                //separator: ';'
            },
            dist: {
                src: ['src/Intro.js' , 'src/Flare.js', 'src/Core/constants.js', 'src/FlareTask/*', 'src/**/*.js','src/Outro.js'],
                dest: 'build/<%= pkg.name %>.<%= pkg.version %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> Version:<%= pkg.version %> Built On: <%= grunt.template.today("yyyy-mm-dd") %> */\n'

            },
            dist: {
                files: {
                    'build/<%= pkg.name %>.<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('build', ['concat', 'uglify']);


};
