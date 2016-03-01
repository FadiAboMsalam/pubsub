'use strict';
var redis=require('../lib/redis');
var broadcast=require('../lib/broadcast');

function save (badges,callback){
	if(badges.length==0){console.log("runs/");callback(null,null);}
	else {
		var badge=badges.pop();
		
		redis.lpush("badges",JSON.stringify(badge),function(err,data){
			if(err){callback(err,null);console.log("error",err);}
		});
		save(badges,callback);
	}
}
function trim(){
	redis.ltrim("badges",0,9);
}
function sends(badges,callback){
	badges.forEach(broadcast.send);
	//	badges.forEach(function(value){
	// 	broadcast.send(value);
	// });
	callback(null,null);
}
function get(callback){
	redis.lrange("badges",0,-1,function(err,badges){
		callback(err,badges.map(JSON.parse));
	})
}

exports.get=get;
exports.save=save;
exports.trim=trim;
exports.sends=sends;