var chat = $.connection.chatHelper;

$(document).ready(function () {

    chat.client.addNewMessageToPage = function (name, message) {

        // Add the message to the page.
        $('#ChatContent').append('<br /> <strong>' + htmlEncode(name)
            + '</strong>: ' + htmlEncode(message) + '<br />' + getCurrentTime());
    };
    chat.client.addTyping = function (type, displayname) {
        // Add the message to the page
        if (displayname != undefined || displayname != '') {
            if ($('#displayname').val() != displayname) {
                document.getElementById("txtTyping").innerHTML = type;

                setTimeout(function () {
                    document.getElementById("txtTyping").innerHTML = "...";
                }, 2000);
            }
        }
    };
});
// Get the user name and store it to prepend to messages.
$('#displayname').val(prompt('Enter your name:', ''));
// Set initial focus to message input box.
//$('#lblDisplayName').val($('#displayname').val());
document.getElementById("lblDisplayName").innerHTML = $('#displayname').val();

$('#SenderContent').focus();
// Start the connection.
$.connection.hub.start().done(function () {

    $('#btnSend').click(function () {
        //alert(time.toString());
        // Call the Send method on the hub.
        //bu metodlar java script tarafında küçük harfle başlamak zorundadır. send gibi
        chat.server.send($('#displayname').val(), $('#SenderContent').val());

        // Clear text box and reset focus for next comment.
        $('#SenderContent').val('').focus();
        document.getElementById("txtTyping").innerHTML = "...";
        chat.server.sendtype("...", $('#displayname').val());
    });
});

$(document).keypress(function (e) {
    chat.server.sendtype("Typing...", $('#displayname').val());
    //enter
    if (e.which === 13) {
        chat.server.send($('#displayname').val(), $('#SenderContent').val());
        // Clear text box and reset focus for next comment.
        $('#SenderContent').val('').focus();
        document.getElementById("txtTyping").innerHTML = "...";
        chat.server.sendtype("...", $('#displayname').val());
    }
});

// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}

function getCurrentTime() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();

    var dt = new Date();
    var time = output + " - " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    return time;
}