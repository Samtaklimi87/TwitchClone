import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";

const filters = { type: "gaming" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const client = StreamChat.getInstance("smvpecsv9z2p");

const App = () => {
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const setupClient = async () => {
      try {
        await client.connectUser(
          {
            id: "dave-matthews",
            name: "Dave Matthews",
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGF2ZS1tYXR0aGV3cyJ9.M0y7PkjIrTC-u59fl2KJ0tBzBg5FBi5CsjN1V2HIY7U',
        );
          const channel = await client.channel('gaming', 'gaming-demo', {
            name: 'Gaming demo',
          });
          setChannel(channel);
        setClientReady(true);
      } catch (err) {
        console.log(err);
      }
    };

    setupClient();
  }, []);

  if (!clientReady) return null;

  return (
    <Chat client={client} darkMode={false}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel  channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;