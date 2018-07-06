const assert = require('chai').assert;
const chromeLauncher = require('chrome-launcher');
const CDP = require('chrome-remote-interface');

function launchChrome() {
  return chromeLauncher.launch({
    port: 9222,
    chromeFlags: [
      '--headless',
      '--disable-gpu',
      //'--load-extension=src',
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
            return Page.navigate({url: 'https://www.haaretz.co.il/news/world/america/.premium-1.4239672'})
            //return Page.navigate({url: 'http://www.example.com'})
          }).catch((err) => {
            client.close();
            chrome.kill();
            done(err);
          })

          Page.loadEventFired(() => {
            Runtime.evaluate({expression: 'document.body.outerHTML'}).then((result) => {
              assert.include(result.result.value, 'coordination');
              //assert.equal(1,1);
              client.close();
              chrome.kill();
              done();
            }).catch((err) => {
              client.close();
              chrome.kill();
              done(err);
            })
          })

        })
      }).catch(err => {
        chrome.kill()
        done(err)
      })
    });
  });
});
