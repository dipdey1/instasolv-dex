import AgoraRTC from "agora-rtc-sdk-ng";

export const appID = '16413846c9704944983167509d540afc'

export const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
})