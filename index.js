var crypto  = require("crypto");
var oauth   = require("oauth");

var XERO_BASE_URL = 'https://api.xero.com';
var XERO_API_URL = XERO_BASE_URL + '/api.xro/2.0';

function Xero(key, secret, rsa_key, showXmlAttributes, customHeaders) {
    this.key = key;
    this.secret = secret;

    // this.parser = new xml2js.Parser({explicitArray: false, ignoreAttrs: showXmlAttributes !== undefined ? (showXmlAttributes ? false : true) : true, async: true});

    this.oa = new oauth.OAuth(null, null, key, secret, '1.0', null, "PLAINTEXT", null, customHeaders);
    this.oa._signatureMethod = "RSA-SHA1"
    this.oa._createSignature = function(signatureBase, tokenSecret) {
        return crypto.createSign("RSA-SHA1").update(signatureBase).sign(rsa_key, output_format = "base64");
    }
}

Xero.prototype.call = function(method, path, body, callback) {
    var self = this;
    var content_type = 'application/json';
    return self.oa._performSecureRequest(self.key, self.secret, method, XERO_API_URL + path, null, null, content_type, callback);
}

module.exports = Xero;
