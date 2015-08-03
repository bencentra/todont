module.exports = function(grunt) {

  'use strict';

  // Loads all grunt tasks from package.json - https://www.npmjs.com/package/matchdep
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('config.json'),

    // Remove previously generated files - https://github.com/gruntjs/grunt-contrib-clean
    clean: {
      dist: ['dist/']
    },

    // Run a local webserver to host the app -https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      local: {
        options: {
          port: 8000,
          protocol: 'http',
          keepalive: true,
          base: './',
          hostname: '*',
          open: {
            target: 'http://localhost:8000'
          }
        }
      }
    },

    // Compile Sass - https://github.com/sindresorhus/grunt-sass
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/ToDont.css': 'src/style/main.scss'
        }
      }
    },

    // Minify CSS files - https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      options: {
        sourceMap: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.css'],
          dest: 'dist',
          ext: '.min.css'
        }]
      }
    },

    // Validate JS syntax - https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
      grunt: {
        src: 'Gruntfile.js'
      },
      karma: {
        src: 'karma.conf.js'
      },
      src: {
        src: 'src/js/**/*.js'
      },
      test: {
        src: 'test/spec/**/*-spec.js'
      }
    },

    // Run unit tests - https://github.com/karma-runner/grunt-karma
    karma: {
      options: {
        configFile: 'karma.conf.js',
        plugins: [
          'karma-jasmine',
          'karma-phantomjs-launcher',
          'karma-coverage'
        ]
      },
      test: {
        browsers: ['PhantomJS'],
        port: 8001,
        singleRun: true,
        coverageReporter: {
          reporters: [
            { type: 'html' }
          ]
        },
      }
    },

    // Concatenate source files - https://github.com/gruntjs/grunt-contrib-concat
    concat: {
      options: {
        stripBanners: true,
        sourceMap: true
      },
      src: {
        options: {
          banner: '/*! <%= pkg.name %>.js, v<%= pkg.version %>, created <%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        src: [
          'src/js/app.js',
          'src/js/ListController.js',
          'src/js/TodoService.js',
          'src/js/ngEnter.js'
        ],
        dest: 'dist/ToDont.js'
      }
    },

    // Minify JS files - https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      options: {
        sourceMap: true,
        banner: '/*! <%= pkg.name %>.min.js, v<%= pkg.version %>, created <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          'dist/ToDont.min.js': ['dist/ToDont.js']
        }
      }
    },

    // Text replace for variable substitution - https://github.com/yoniholmes/grunt-text-replace
    replace: {
      dev: {
        src: ['dist/ToDont.js'],
        dest: 'dist/ToDont.js',
        replacements: [
          { from: '\'API_BASE_URL\'', to: '<%= config.API_BASE_URL %>' }
        ]
      }
    },

    // Validate JSON syntax - https://github.com/brandonramirez/grunt-jsonlint
    jsonlint: {
      config: {
        src: ['config.json']
      }
    },

    // Watch files for changes - https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      style: {
        files: ['src/style/**/*.scss'],
        tasks: ['sass']
      },
      src: {
        files: ['src/js/**/*.js'],
        tasks: ['jshint:src', 'karma:test', 'clean', 'concat:src']
      },
      test: {
        files: ['test/spec/**/*-spec.js'],
        tasks: ['jshint:test', 'karma:test']
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:grunt']
      },
      karma: {
        files: ['karma.conf.js'],
        tasks: ['jshint:karma', 'karma:test']
      },
      config: {
        files: ['config.json'],
        tasks: ['build']
      }
    }

  });

  // Custom tasks
  grunt.registerTask('build', ['jsonlint', 'jshint', 'karma:test', 'clean', 'sass', 'concat:src', 'cssmin', 'replace', 'uglify']);
  grunt.registerTask('dev',  ['build', 'watch']);
  grunt.registerTask('test', ['karma:test']);
  grunt.registerTask('serve', ['connect:local']);

};
