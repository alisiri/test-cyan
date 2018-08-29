module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        clean: {
            pre: [ 'build/*' ],
            dist: [ 'dist/*' ],
            post: [ 'build' ],
            precopy: [ 'build/dist/css/*.map', 'build/dist/css/*.css', '!build/dist/css/*.min.css', 'build/dist/js/*.js', '!build/dist/js/*.min.js' ],
            postcopy: [ "build/dist" ]
        },
        copy: {
            libs: {
                files: [
                    { expand: true, cwd: 'src/', src: "lib/**", dest: 'build/', filter: 'isFile' }
                ]
            },
            js: {
                files: [
                    { expand: true, cwd: 'src/', src: "js/**", dest: 'build/', filter: 'isFile' }
                ]
            },
            builddist: {
                files: [
                    { expand: true, cwd: 'build/', src: "css/**", dest: 'build/dist/', filter: 'isFile' }
                ]
            },
            dist: {
                files: [
                    { expand: true, cwd: 'build/dist', src: "**", dest: 'dist/' }
                ]
            }
        },
        cssmin: {
            dist: {
                files: [{
                    'build/dist/css/tapedeck.min.css': 'build/css/tapedeck.css'
                }]
            }
        },
        uglify: {
            lib: {
                src: 'build/dist/js/tapedeck-lib.js',
                dest: 'build/dist/js/tapedeck-lib.min.js'
            },
            js: {
                src: 'build/dist/js/tapedeck.js',
                dest: 'build/dist/js/tapedeck.min.js'
            },
            ts: {
                src: 'build/dist/js/tapedeck-ts.js',
                dest: 'build/dist/js/tapedeck-ts.min.js'
            }
        },
        sass: {
            options: {
                force:true,
                sourceMap: true
            },
            dist:{
                files: { // sass files
                    'build/css/tapedeck.css'          : 'src/css/stylesheet.scss'
                }
            }
        },
        ts: {
            default: {
                tsconfig: 'tsconfig.json'
            }
        },
        qunit: {
            all: {
                options: {
                    urls:[
                        'http://localhost:4444/tests/test-both/index.html',
                    ]
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 4444,
                    base: ['.', 'tests', 'tests/test-both']
                }
            }
        }
    });

    var _concat = function(prefix, setsVar, outFile) {
        var p = grunt.file.readJSON('package.json'),
            set = p[setsVar],
            out = "";

        function extractFile (path, files) {
            out += grunt.file.read(path) + "\n";
        }

        for(var j = 0; j < set.length; j++) {
            grunt.file.expand(prefix + set[j]).forEach(extractFile);
        }

        grunt.file.write(outFile, out);
    };

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-qunit-junit');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-sass'); // grunt-sass is in C and is faster than grunt-contrib-sass in ruby
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask("sassy",['sass']);

    grunt.registerTask("clear", ["clean:pre","clean:dist"]);
    grunt.registerTask("clean-build", ["clean:post"]);

    grunt.registerTask("libs", "copy:libs");
    grunt.registerTask("js", "copy:js");

    grunt.registerTask("build", ["clean:pre","sassy","libs","js","ts"]);

    grunt.registerTask("concat", function() {
        _concat("build/js/", "js", "build/dist/js/tapedeck.js");
        _concat("build/js/generated/", "ts", "build/dist/js/tapedeck-ts.js");
        _concat("build/lib/", "lib", "build/dist/js/tapedeck-lib.js");
    });

    grunt.registerTask("dist", ["concat", "copy:builddist", "cssmin:dist", "uglify", "clean:precopy", "copy:dist", "clean:postcopy"]);

    grunt.registerTask("build-dist", ["clean:dist","build","dist"]);

    grunt.registerTask("test", [ "qunit_junit",  "connect:server", "qunit"]);
};
