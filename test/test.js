/*global describe, beforeEach, it */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('Jadestyl generator test', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.Jadestyl = helpers.createGenerator('Jadestyl:app', [
        '../../app', [
          helpers.createDummyGenerator(),
          'mocha:app'
        ]
      ]);
      this.Jadestyl.options['skip-install'] = true;

      done();
    }.bind(this));
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../src');
  });

  it('creates expected files', function (done) {
    var expected = [
      'bower.json',
      'package.json',
      'Gruntfile.js',
      'src/favicon.ico',
      'src/styles/main.styl',
      'src/index.jade',
      'src/scripts/main.js'
    ];

    helpers.mockPrompt(this.webapp, {
      features: ['jQuery', 'animateCss', 'htmlmin']
    });

    this.webapp.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});