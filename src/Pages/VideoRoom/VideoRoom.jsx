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


// const doubtRoomZEGO = async (element) => {
//     const appID = 1558067743
//     const serverSecret = 'e296b44d30779ff1a510e80a26f69cec'
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, zegoObject.roomID,  user.$id,  zegoObject.username)
//     const zc = ZegoUIKitPrebuilt.create(kitToken)
//     zc.joinRoom(
//         {
//         container: element,
//         maxUsers:2,
//         scenario:{
//             mode:ZegoUIKitPrebuilt.OneONoneCall
//         },
//         showPreJoinView: false,
//         turnOnMicrophoneWhenJoining: false,
//         turnOnCameraWhenJoining:false,
//         useFrontFacingCamera: true,
//         showLeavingView: false,
//         onLeaveRoom: () => {
//             handleEndDoubt(ongoingDoubtObject.info.doubtID ,ongoingDoubtObject.info.$id)
//         },
//     })
// }

// useEffect(() => {
//   //   client.on('user-published', handleUserPublished)
//   //   client.on('user-left', handleUserLeft)
  
//   //   client.join(appID, agoraObject.channelName, agoraObject.token, agoraObject.uid).then((uid) => 
//   //    AgoraRTC.createMicrophoneAndCameraTracks()
//   //   ).then(tracks => {
//   //     const [audioTracks, videoTracks] = tracks
//   //     client.publish(tracks)
//   //   }
//   //     )
//   console.log(agoraObject);
//   },[])
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