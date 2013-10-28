chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name === 'User-Agent') {
        details.requestHeaders[i].value = 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)';
        break;
      }
    }
    return {requestHeaders: details.requestHeaders};
  },
  {
    urls: ['http://*.haaretz.co.il/*']
  },
  [
    'blocking',
    'requestHeaders'
  ]
);

chrome.contentSettings.javascript.set({
  primaryPattern: "http://*.haaretz.co.il/*",
  setting: "block"
})
