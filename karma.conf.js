module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['test_*.js'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['HeadlessChromeWithExtensions'],
    customLaunchers: {
      HeadlessChromeWithExtensions: {
        base: 'ChromeHeadless',
        flags: ['--disable-gpu', '--load-extension=.', '--remote-debugging-port=9222']
      }
    },
    autoWatch: false,
    concurrency: Infinity
  })
}

