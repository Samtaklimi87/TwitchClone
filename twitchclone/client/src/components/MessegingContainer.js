import {  ChannelHeader, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

const MessegingContainer = () => {
    return(
        <div className="messeging-container">
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
        </div>
    )
}
export default MessegingContainer;