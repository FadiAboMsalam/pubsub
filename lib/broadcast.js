'use strict';
var axon = require('axon');
var socket = axon.socket('pub');
socket.bind(8001);

function send(badge){
	socket.send(badge);
}
exports.send=send;