
// Reference: https://support.google.com/webmasters/answer/1061943?hl=en
var USER_AGENTS = {
  DESKTOP: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  MOBILE: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.114 Mobile Safari/537.36 Edg/80.0.345.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'
};

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var url_parts = details.url.split('?');
    if (url_parts[1]) {
      return {
        redirectUrl: url_parts[0]
      }
    }
  },
  {
    urls: [
      '*://*.haaretz.co.il/*',
      '*://*.haaretz.com/*',
      '*://*.themarker.com/*',
    ]
  },
  [
    'blocking',
  ]
);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    for (var i = 0; i < details.requestHeaders.length; ++i) {
      if (details.requestHeaders[i].name.toLowerCase() === 'user-agent') {
        if (typeof window.orientation !== 'undefined') {
          details.requestHeaders[i].value = USER_AGENTS.MOBILE;
        } else {
          details.requestHeaders[i].value = USER_AGENTS.DESKTOP;
        }
        break;
      }
    }

    return {
      requestHeaders: details.requestHeaders
    };
  },
  {
    urls: [
      '*://*.haaretz.co.il/*',
      '*://*.haaretz.com/*',
      '*://*.themarker.com/*',
    ]
  },
  [
    'blocking',
    'requestHeaders'
  ]
);


