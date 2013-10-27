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

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    details.responseHeaders.push({
      name: 'Set-Cookie',
      value: 'HtzPusr: yesplease'
    });
    return {responseHeaders: details.responseHeaders};
  },
  {
    urls: ['http://*.haaretz.co.il/*']
  },
  [
    'blocking',
    'responseHeaders'
  ]
);
