'use strict';
var path = require('path'),
  helpers = require('yeoman-generator').test,
  assert = require('yeoman-generator').assert;

describe('Jadestyl generator', function () {
  // not testing the actual run of generators yet
  it('the generator can be required without throwing', function () {
    this.app = require('../app');
  });

  describe('run test', function () {

    var expectedContent = [
      ['.bowerrc', /"directory": "bower_components"/],
      ['package.json', /"version": "0.0.0"/]
    ];
    var expected = [
      '.bowerrc',
      '.gitignore',
      'gulpfile.js',
      'package.json',
      'bower.json',
      'README.md',
      'src/index.jade',
      'src/scripts/main.js',
      'src/styles/main.styl'
    ];

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    };

    var runGen;

    beforeEach(function () {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
    });

     it('creates expected files', function (done) {
      runGen.withOptions(options).on('end', function () {

        assert.file(expected);
        assert.fileContent([].concat(
          expectedContent,
          [
            ['src/index.jade', /.animated/],
            ['src/scripts/main.js', /jquery/]
          ]
        ));
        assert.noFileContent([
          ['src/scripts/main.js', /velocity/],
          ['src/scripts/main.js', /imgprogress/],
          ['src/styles/main.styl', /imgprogress/]
        ]);
        done();
      });
    });

    it('creates ImgProgress expected files', function (done) {
      runGen.withOptions(options).withPrompt({imgProgress: true, jquery: false, animateCss:false}).on('end', function () {

        assert.file(expected);
        assert.fileContent([].concat(
          expectedContent,
          [
            ['src/scripts/main.js', /imgprogress/],
            ['src/styles/main.styl', /imgprogress/],
            ['src/scripts/main.js', /jquery/]
          ]
        ));
        assert.noFileContent([
          ['src/index.jade', /.animated/],
          ['src/scripts/main.js', /velocity/]
        ]);
        done();
      });
    });

    it('creates Velocity expected files', function (done) {
      runGen.withOptions(options).withPrompt({velocity: true, jquery: false, animateCss:false}).on('end', function () {

        assert.file(expected);
        assert.fileContent([].concat(
          expectedContent,
          [
            ['src/scripts/main.js', /velocity/],
            ['src/scripts/main.js', /jquery/]
          ]
        ));
        assert.noFileContent([
          ['src/index.jade', /.animated/],
          ['src/scripts/main.js', /imgprogress/],
          ['src/styles/main.styl', /imgprogress/]
        ]);
        done();
      });
    });
  });
});
