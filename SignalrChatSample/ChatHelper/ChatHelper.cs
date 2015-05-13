using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalrChatSample.ChatHelper
{
    public class ChatHelper : Hub
    {

        public void Hello()
        {
            Clients.All.hello();
        }
        public void Send(string name, string message)
        {
            // Call the addNewMessageToPage method to update clients.
            Clients.All.addNewMessageToPage(name, message);
        }

        //bu metodlar java script tarafında küçük harfle başlamak zorundadır.
        public void sendtype(string type, string displayname)
        {
            // Call the addNewMessageToPage method to update clients.
            string typingWithName = String.Format("{0} typing...",displayname);
            Clients.All.addTyping(typingWithName, displayname);
        }
    }
}