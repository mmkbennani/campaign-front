import React, { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import "rsuite/dist/rsuite.min.css";
import { Button } from "rsuite";
import { MetaProvider, MetaEditor, Hooks, Context } from "pixel-streaming";

const PlayerView = () => {


  const [psHost, setPsHost] = useState("");
  const refPlayer = React.useRef(null);


  useEffect(() => {
    // Connect to your matchmaker signaling server.
    // This server selects one of your available streaming instances.
    const matchmakerSocket = new WebSocket('wss://3metad.online');

    matchmakerSocket.onopen = () => {
      console.log('Connected to matchmaker signaling server.');
      // Send a client request for a streaming instance.
      matchmakerSocket.send(
        JSON.stringify({
          type: 'clientRequest',
          clientId: generateClientId(10) // You may generate or assign a unique id.
        })
      );
    };

    matchmakerSocket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      // If a match is found, update the psHost state with the provided streamingUrl.
      if (msg.type === 'matchFound' && msg.streamingUrl) {
        console.log('Received match:', msg);
        setPsHost(msg.streamingUrl);
      } else if (msg.type === 'noMatchFound') {
        console.error('No available streaming instance at the moment.');
      }
    };

    matchmakerSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    console.log("psHost : "+psHost)
    return () => {
      // Clean up the socket when the component unmounts.
      matchmakerSocket.close();
    };
  }, []);

  function generateClientId(length: number) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }

  return (
    !!psHost && <MetaEditor
        ref={refPlayer}
        debugMode="on"
        showToolbar={false}
        psHost={psHost}
        psConfig={{
          autoPlay: true,
          autoConnect: true,
          startMuted: true,
          hoveringMouse: true,
          fakeMouseWithTouches: true,
          matchViewportRes: true
        }}
      >
        
      </MetaEditor>
  );
}; 

export const PixelStreamingWithWeb3 = () => {

  const { isConnected, address } = useAccount();

  console.log('Web3Component rendu', { isConnected, address });

  return (
    <MetaProvider>
      <PlayerView />
    </MetaProvider>
  );
};