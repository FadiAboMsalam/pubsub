'use strict';
var _=require('underscore');
var model=require('../models/badges');


function save(req,res,next){
	var badges=_.clone(req.body);
	console.log("badges",badges);
	model.save(badges,function(err){
		if (err) {return res.json(503,{error:true});}
		next();	
		model.trim();
	});
}
function send(req,res,next){
	var badges=_.clone(req.body);
	console.log("send");
	model.sends(badges,function(err){
		if (err) {return res.json(503,{error:true});}
		res.json(200,{err:null});
	});

}
function get(req,res,next){
	model.get(function(err,badge){
		if (err) {return res.json(503,{error:true});}
		res.json(200,badge);
		res.end();
	});
}

exports.get=get;
exports.save=save;
exports.send=send;