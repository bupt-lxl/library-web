//import { Crypto } from "cryptojs"

//<script type="text/javascript" src="../../../node_modules/cryptojs/cryptojs.js"></script>
//<script type="text/javascript" src="/xxx/dufy/common/js/core/pad-zeropadding-min.js"></script>

/*
export function encrypt(data) {
    var key  = Crypto.charenc.Latin1.parse('dufy20170329java');
    var iv   = Crypto.charenc.Latin1.parse('dufy20170329java');
      ///Crypto.enc.Latin1.parse('dufy20170329java');
     //var iv   = Crypto.charenc.Latin1.parse('dufy20170329java');
    return Crypto.AES.encrypt(data, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
}
*/

//export function encrypt(data) {
 
export function encrypt(data) {
    let CryptoJS = require("crypto-js");
        console.log(CryptoJS.HmacSHA1("Message", "Key"));   
        var key  = CryptoJS.enc.Latin1.parse('dufy20170329java');
        var iv   = CryptoJS.enc.Latin1.parse('dufy20170329java');
        return CryptoJS.AES.encrypt(data, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding}).toString();
}

