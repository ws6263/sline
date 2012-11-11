// JavaScript Document
// PROJECT: Phonegap LocalNotifications
// AUTHOR: Drew Dahlman ( www.drewdahlman.com )
// DATE: 1.26.2012

/*
NOTES:
We will be creating LocalNotifications that can be set to fire while app is inactive, 
and create a callback for the JS to know when the app has come back from a notification.

One thing that is deceptive about the LocalNotifications plugin is that when it shows a notification
has been created it shows it based on the timezone +0000 which can throw you off.

in the call for setting the notification we simply call notification.local_timed("13:00") - note that I supplied a string.

The ability to set repeating notifications has been added! 
- daily
- weekly
- monthly
- yearly
*/


// NOTIFICATION CENTER
/*
I like to set up one object that's only job is to manage notifications
*/
var notification = {
	init:function(){
		
	},
    
	// This will fire after 50 seconds
	local_min:function(msg, localBadge){
		var d = new Date();
		d = d.getTime() + 5*1000; //  1 * 1000 = 1 second // from now
		d = new Date(d);
		plugins.localNotification.add({
			date: d,
			repeat:'second',
			message: msg,
			hasAction: true,
			badge: localBadge,
			id: '1',
			sound:'horn.caf',
			background:'app.background',
			foreground:'app.running'
		});
	},
	
	clear:function(){
		plugins.localNotification.cancelAll();
	}
}

// APP
var app = {
	bodyLoad:function(){
		document.addEventListener("deviceready", app.deviceReady, false);
	},
	deviceReady:function(){
		app.init();
	},
	init:function(){
		
	},
	background:function(id){
		console.log("I was in the background but i'm back now! ID="+id);
	},
	running:function(id){
		console.log("I am currently running, what should I do? ID="+id);
	}
};