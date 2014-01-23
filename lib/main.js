var {Cc, Ci, Cr} = require('chrome');

var observer = {
  observe: function(subject, topic, data) {
    if (topic == 'http-on-modify-request') {
      var channel = subject.QueryInterface(Ci.nsIHttpChannel);
      if (/haaretz\.co(m|\.il)/.test(channel.originalURI.host)) {
        channel.setRequestHeader('User-Agent', 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)', false);
      }
      if (/\/htz\/js\/bots\.js/.test(channel.originalURI.path)) {
        subject.cancel(Cr.NS_BINDING_ABORTED);
      }
    }
  }
};

var observerService = Cc['@mozilla.org/observer-service;1'].getService(Ci.nsIObserverService);
observerService.addObserver(observer, 'http-on-modify-request', false);
