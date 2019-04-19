var socket = io();

socket.on('connect',function() {
  console.log('connected to server');
});

socket.on('disconnect',function() {
  console.log('disconnected from server');
});

socket.on('newMessage',function(msg) {
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: msg.text,
    createdAt: formattedTime,
    from: msg.from
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage',function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    url: msg.url,
    createdAt: formattedTime,
    from: msg.from
  });
  jQuery('#messages').append(html);
});

var messageTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit',function(e) {
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextBox.val()
  },function(){
    messageTextBox.val('');
  });
});


var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessages',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});
