'use strict';

var util = require('util'),
  path = require('path'),
  yeoman = require('yeoman-generator'),
  chalk = require('chalk');


var JadeGenerator = module.exports = function JadeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(JadeGenerator, yeoman.generators.NamedBase);

// welcome message
var welcome =
  "\n" +
  chalk.green.bold("Thanks for choosing JadeStyl for your application! :)   -@cedced19") +
  "\n";


JadeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(welcome);

  var prompts = [{
      name: 'title',
      message: 'What is the title of your application?',
      default: 'Hello World'
    }]
};

JadeGenerator.prototype.setupProjectFiles = function setupProjectFiles() {
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('README.md', 'README.md');

  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
  this.copy('editorconfig', '.editorconfig');
}

JadeGenerator.prototype.setupPackageJson = function setupPackageJson() {
  var packageJson = {
    'name': this.shortName + '-bespoke',
    'version': '0.0.0',
    'dependencies': {},
    'devDependencies': {
      'grunt': '~0.4.1',
      'grunt-contrib-clean': '~0.4.0',
      'grunt-contrib-copy': '~0.4.1',
      'grunt-contrib-watch': '~0.5.1',
      'grunt-contrib-jade': '~0.9.0',
      'grunt-contrib-stylus': '~0.5.0',
      'grunt-contrib-coffee': '~0.7.0',
      'grunt-usemin': '~2.0.2',
      'grunt-contrib-concat': '~0.3.0',
      'grunt-contrib-cssmin': '~0.7.0',
      'grunt-contrib-uglify': '~0.2.7',
      'grunt-contrib-connect': '~0.3.0',
      'grunt-open': '~0.2.1',
      'grunt-concurrent': '~0.3.0',
      'grunt-gh-pages': '~0.6.0',
      'connect-livereload': '~0.2.0',
      'matchdep': '~0.3.0'
    },
    'engines': {
      'node': '>=0.8.0'
    }
  };
  this.write('package.json', JSON.stringify(packageJson, null, 2));
};

JadeGenerator.prototype.setupBowerJson = function setupBowerJson() {
  var bowerJson = {
    'name': this.shortName + '-bespoke',
    'version': '0.0.0',
    'dependencies': {
      'jquery': '~1.11.0'
    }
  };

  this.write('bower.json', JSON.stringify(bowerJson, null, 2));
};

JadeGenerator.prototype.setupFiles = function setupFiles() {
  this.mkdir('src');
  this.mkdir('src/scripts');
  this.mkdir('src/styles');

  this.template('src/index.jade', 'src/index.jade');
  this.template('src/scripts/main.js', 'src/scripts/main.js');
  this.template('src/styles/main.styl', 'src/styles/main.styl');
};