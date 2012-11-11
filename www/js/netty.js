var userName = 'user' + Math.floor((Math.random()*1000)+1);

var socket =  io.connect('http://semantics.korea.ac.kr:80');

var localBadge = 0;


socket.on('connect', function() {
          output('<span class="connect-msg">Client has connected to the server!</span>');
          });

socket.on('message', function(data) {
          notification.local_min(data.message, localBadge++);   //변경
          //playBeep();
          vibrate();
          //user의 이름과 message 결합
          if(data.userName ==userName) {
            output('<span class="myname-msg">' + '나' + ':</span> ' + data.message);
          }
          else{
            output('<span class="username-msg">' + data.userName + ':</span> ' + data.message);
          }
          });

socket.on('disconnect', function() {
          output('<span class="disconnect-msg">The client has disconnected!</span>');
          });


function sendDisconnect() {
    socket.disconnect();
}

function sendMessage() {
    var message = $('#msg').val();
    $('#msg').val('');
    
    // don't forget to define type field '@class'
    // it should equals to class name which used
    // to deserialize object on server side
    // via ...addJsonObjectListener() method
    //
    // TIP: you can customize type name field
    // via Configuration.jsonTypeFieldName property
    
    var jsonObject = {'@class': 'com.corundumstudio.socketio.demo.ChatObject',
                        userName: userName,
                        message: message};
    socket.json.send(jsonObject);
}

function output(message) {
    var currentTime = "<span class='time'>" +  moment().format('HH:mm:ss.SSS') + "</span>";
    var element = $("<div>" + currentTime + " " + message + "</div>");
    //$('#console').prepend(element);
    $('#console').append(element);
    //alert(message);
    //showAlert(message);
    //vibrate();
    //playBeep();
}


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
}

function vibrate () {
    navigator.notification.vibrate (2000);
}

function playBeep () {
    navigator.notification.beep(3);
}

function alertDimissed() {
    alert("Dismissed");
    
}

function showAlert(message) {
    navigator.notification.alert(
                                 message, alertDimissed, 'Game over', 'Done'
                                 );
}

function onConfirm(buttonIndex)  {
    alert('you seleted utton' + buttonIndex);
}

function showConfirm() {
    navigator.notification.confirm(
                                   'You are the winner!', onConfirm, 'Game Over', 'Restart, Exit'
                                   );
}

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

// Cordova is loaded and it is now safe to make calls Cordova methods
//
function onDeviceReady() {
    document.addEventListener("resume", onResume, false);
}

// Handle the resume event
//
function onResume() {
    setTimeout(0);
    localBadge = 0; //내부 변수의 뱃지 초기화를 위해 
}


document.addEventListener('resume', onResume, false);


document.addEventListener('push-notification', function(event) {
                          console.warn('push-notification!: ' + event.notification);
                          navigator.notification.alert(JSON.stringify(['push-notification1!', event.notification]));
                          var notification = JSON.parse(event.notification);
                          navigator.notification.alert(notification.aps.alert);
                          //pushNotification.setApplicationIconBadgeNumber(0);
                          pushNotification.setApplicationIconBadgeNumber(0);
                          });