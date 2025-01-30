import React from 'react';
import { useAccount } from 'wagmi';

import "rsuite/dist/rsuite.min.css";
import { Button } from "rsuite";
import { MetaProvider, MetaEditor, Hooks, Context } from "pixel-streaming";

const PlayerView = () => {
  const refPlayer = React.useRef(null);

  // context
  const global = Context.global();
  const stream = Context.stream();

  // hooks
  const actions = Hooks.actions();

  const changeAvatar = function() {
    actions.emitUi({type: "changeAvatar",avatarName: "MyNewAvatar"});
  };
  

  return (
    <MetaEditor
      ref={refPlayer}
      debugMode="on"
      showToolbar={false}
      onLoad={() => {
        console.log("@".repeat(30));
        console.dir(refPlayer.current);
        console.dir(global);
        console.dir(stream);
        console.dir(actions);
      }}
      psHost="wss://3metad.online"
      psConfig={{
        autoPlay: true,
        autoConnect: false,
        startMuted: true,
        hoveringMouse: true,
        fakeMouseWithTouches: true,
        matchViewportRes: true
      }}
    >
      <Button onClick={() => actions.emitUi({ action: "ui_command" })}>
        Send action
      </Button>
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