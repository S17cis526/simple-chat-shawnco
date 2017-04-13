var socket = io();
socket.on('welcome', function(text){
    $('<li>').text(text.message).appendTo('#message-log');
});

socket.on('message', function(text){
    console.log(text);
    $('<li>')
    .text(text.user + ': ' + text.message.message)
    .css('color', text.color)
    .appendTo('#message-log');
});

$('#chat-send').on('click', function(){
    var text = $('#chat-text').val();
    socket.emit('message', {message: text});
    $('#chat-text').val('');
});

$('#color').on('change', function(){
    var color = $(this).val();
    socket.emit('color', color);
});
