import AgoraRTC from "agora-rtc-sdk-ng";

export const appID = import.meta.env.VITE_APP_ID

export const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
})