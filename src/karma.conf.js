// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    autoWatch: true,
    basePath: '',
    browsers: ['ChromeHeadless'],
    client: {
      clearContext: false
    },
    colors: true,
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    jasmineDiffReporter: {
      pretty: false,
      multiline: true,
      legacy: true
    },
    logLevel: config.LOG_ERROR,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-diff-reporter'),
      require('karma-spec-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    port: 9876,
    reporters: ['jasmine-diff', 'spec'],
    singleRun: false,
    specReporter: {
      suppressPassed: true,
      suppressErrorSummary: true
    }
  });
};
