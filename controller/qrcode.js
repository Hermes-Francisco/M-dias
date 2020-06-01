var QRCode = require('qrcode')
var IP = require("ip");

class qrcode{
    generate(req, res){
		const ip = 'http://'+IP.address()+':3000';
        QRCode.toDataURL(ip, function (err, url) {
            return res.send("<table align='center'><tr><td>"+
            "<img height='200px' style='margin-top: 50px' src='"+url+"'></img>"+
            "</td></tr></table>"+
            "<h2 align='center'>"+ip+"</h2>")
        })
    }
}
module.exports = new qrcode();
