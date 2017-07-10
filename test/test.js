const assert = require('chai').assert;
const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');

function launchChrome() {
  return chromeLauncher.launch({
    port: 9222,
    chromeFlags: [
      '--headless',
      '--disable-gpu',
      '--no-sandbox'
    ]
  })
}

describe('test', () => {
  describe('thisistest', () => {
    it('should show chrome', (done) => {
      launchChrome().then(chrome => {
        CDP((client) => {
          const {Network, Page, Runtime} = client;

          Promise.all([
            Network.enable(),
            Page.enable()
          ]).then(() => {
            return Page.navigate({url: 'https://www.example.com'})
          }).catch((err) => {
            done(err);
          })

          Page.loadEventFired(() => {
            Runtime.evaluate({expression: 'document.body.outerHTML'}).then((result) => {
              assert.include(result.result.value, 'coordination');
              client.close();
              chrome.kill();
              done();
            }).catch((err) => {
              done(err);
            })
          })

        })
      }).catch(err => {
        done(err)
      })
    });
  });
});
