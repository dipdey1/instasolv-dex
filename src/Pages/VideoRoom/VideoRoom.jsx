import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Utils/AuthContext'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { ZegoSuperBoardManager } from "zego-superboard-web";
import './VideoRoom.scss'
import { useDoubt } from '../../Utils/DoubtContext';
import { appID, client } from '../../../agoraRTC';
import AgoraUIKit from 'agora-react-uikit';

const VideoRoom = () => {

   const {user} = useAuth()
   const {zegoObject,handleEndDoubt,ongoingDoubtObject,agoraObject} = useDoubt()


const [videoCall, setVideoCall] = useState(true);

const callbacks = {
  EndCall: () => {
    setVideoCall(false)
    handleEndDoubt(ongoingDoubtObject.info.doubtID ,ongoingDoubtObject.info.$id)
  }
};
const rtcProps = {
  appId: appID, 
  channel: agoraObject.channelName, 
  token: agoraObject.token, // enter your channel token as a string 
  uid: agoraObject.uid
}; 
  return (
    // <div><div ref={doubtRoomZEGO} className='video-room'/></div>
    videoCall ? (
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
      </div>
    ) : (
      <h3 onClick={() => setVideoCall(true)}>Join</h3>
    )
  )
}

export default VideoRoom