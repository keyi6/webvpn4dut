// copied from webvpn.dlut.edu.cn
import { aesjs } from './aes-js';

var utf8 = aesjs.utils.utf8;
var hex = aesjs.utils.hex
var AesCfb = aesjs.ModeOfOperation.cfb
var textRightAppend = function (text, mode) {
	var segmentByteSize = mode === 'utf8' ? 16 : 32

	if (text.length % segmentByteSize === 0) {
		return text
	}

	var appendLength = segmentByteSize - text.length % segmentByteSize
	var i = 0
	while (i++ < appendLength) {
		text += '0'
	}
	return text
}

var encrypt = function (text, key, iv) {
	var textLength = text.length
	text = textRightAppend(text, 'utf8')
	var keyBytes = utf8.toBytes(key)
	var ivBytes = utf8.toBytes(iv)
	var textBytes = utf8.toBytes(text)
	var aesCfb = new AesCfb(keyBytes, ivBytes, 16)
	var encryptBytes = aesCfb.encrypt(textBytes)
	return hex.fromBytes(ivBytes) + hex.fromBytes(encryptBytes).slice(0, textLength * 2)
}

var decrypt = function (text, key) {
	var textLength = (text.length - 32) / 2
	text = textRightAppend(text, 'hex')
	var keyBytes = utf8.toBytes(key)
	var ivBytes = hex.toBytes(text.slice(0, 32))
	var textBytes = hex.toBytes(text.slice(32))
	var aesCfb = new AesCfb(keyBytes, ivBytes, 16)
	var decryptBytes = aesCfb.decrypt(textBytes)
	return utf8.fromBytes(decryptBytes).slice(0, textLength)
}


function encrypUrl(protocol, url) {
	var port = '';
	var segments = '';

	if (url.substring(0, 7) == 'http://') {
		url = url.substr(7);
	} else if (url.substring(0, 8) == 'https://') {
		url = url.substr(8);
	}


	var v6 = '';
	var match = /\[[0-9a-fA-F:]+?\]/.exec(url);
	if (match) {
		v6 = match[0];
		url = url.slice(match[0].length);
	}
	segments = url.split('?')[0].split(':');
	if (segments.length > 1) {
		port = segments[1].split('/')[0]
		url = url.substr(0, segments[0].length) + url.substr(segments[0].length + port.length + 1);
	}

	if (protocol != 'connection') {
		var i = url.indexOf('/');
		if (i == -1) {
			if (v6 != '') {
				url = v6;
			}
			url = encrypt(url, 'wrdvpnisthebest!', 'wrdvpnisthebest!')
		} else {
			var host = url.slice(0, i);
			var path = url.slice(i);
			if (v6 != '') {
				host = v6;
			}
			url = encrypt(host, 'wrdvpnisthebest!', 'wrdvpnisthebest!') + path;
		}
	}
	if (port != '') {
		url = '/' + protocol + '-' + port + '/' + url;
	} else {
		url = '/' + protocol + '/' + url;
	}
	console.log(url);
	return url
}

// Added by me.
// Create a module to export.
export default class Encoder {
    encode(protocol, url) {
    	return 'https://webvpn.dlut.edu.cn' + encrypUrl(protocol, url);
	}
}

