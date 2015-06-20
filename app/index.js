'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var JadestylGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Jadestyl generator!'));

    var prompts = [{
      name: 'title',
      message: 'What is the title of your application?',
      default: this.appname
    },{
      type: 'confirm',
      name: 'jQuery',
      message: 'Would you like jQuery ?',
      default: true
    },{
      type: 'confirm',
      name: 'imgProgress',
      message: 'Would you like add a progressbar according with the number of image in the page ?',
      default: false
    },{
      type: 'confirm',
      name: 'animateCss',
      message: 'Would you like Animate.css ?',
      default: true
    },{
      type: 'confirm',
      name: 'velocity',
      message: 'Would you like Velocity JS ?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.title = props.title;
      this.animateCss = props.animateCss;
      this.jQuery = props.jQuery;
      this.imgProgress = props.imgProgress;
      this.velocity = props.velocity;
      this.htmlmin = props.htmlmin;

      done();

      var extractGeneratorName = function (_, appname) {
        var slugged = _.slugify(title);
        var match = slugged.match(/^$/);

        if (match && match.length === 2) {
          return match[1].toLowerCase();
      }

      return slugged;
      };
        }.bind(this));
      },

     bower: function () {
        var bower = {
          name: this._.slugify(this.title + '-jadestyl'),
          private: true,
          dependencies: {}
        };

        if (this.jQuery) {
         bower.dependencies.jquery = '1.11.0'
        }

        if (this.animateCss) {
          var ani = 'animate.css'
          bower.dependencies[ani] = '~3.1.1';
        }

         if (this.imgProgress) {
          bower.dependencies.imgprogress = 'https://github.com/cedced19/imgprogress.git';
        }

        if (this.velocity) {
          bower.dependencies.velocity = 'https://github.com/julianshapiro/velocity.git';
        }

        this.write('bower.json', JSON.stringify(bower, null, 2));
      },


    app: function () {
      this.mkdir('src');
      this.mkdir('src/scripts');
      this.mkdir('src/styles');

      this.template('src/index.jade', 'src/index.jade');
      this.template('src/scripts/main.js', 'src/scripts/main.js');
      this.template('src/styles/main.styl', 'src/styles/main.styl');
      this.copy('_package.json', 'package.json');
      this.copy('gitignore', '.gitignore');
      this.copy('bowerrc', '.bowerrc');
      this.template('gulpfile.js', 'gulpfile.js');
      this.template('README.md', 'README.md');
    }
  });


module.exports = JadestylGenerator;
