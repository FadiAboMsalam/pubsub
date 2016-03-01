var axon = require('axon');
var sock = axon.socket('sub');

sock.connect(8001);

module.subscripe=function(callback){
	sock.on('badge', function(badge){
	 	callback(null,badge);
	});
}