import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import {AiOutlineClose} from "react-icons/ai"
import { BsFillCameraVideoFill} from "react-icons/bs"
import { SocketContainerContext } from '../../SocketContainer/SocketContainer'
import { MobileView, isMobile } from 'react-device-detect';


const InComingCall = (props) => {
  const {socketState }= useContext(SocketContainerContext)
  useEffect(()=> {
    const soundInComingCall= document.createElement("audio")
    soundInComingCall.autoplay= true
    soundInComingCall.src= "https://res.cloudinary.com/cockbook/video/upload/v1673162350/single/Facebook_Messenger_Call_iysnpd.mp3"
    soundInComingCall.loop= true
    return ()=> {
        soundInComingCall.src= undefined
    }
  }, [])
  return (
    <div className={"c-flex-center"} style={{width: '100%', position: "fixed", top:0 , left: 0, height: '100%', zIndex: 999, background: "rgba(0,0 ,0 ,0.3)"}}>
        <div style={{padding: 16, borderRadius: 10, border: '1px solid #d9d9d9', background: "#fff"}}>
            <div style={{width: "100%"}} className={"c-flex-center"}>
                <img src={props?.profilePicture} style={{width: 60, height: 60, borderRadius: "50%", objectFit: "cover"}} alt="" />
            </div>
            <div style={{marginTop: 4, textAlign: "center", fontSize: 24, fontWeight: 600}}>
                {props?.username}
            </div>
            <div style={{marginTop: 8, textAlign: "center", fontSize: 14}}>
                Cuộc gọi sẽ bắt đầu khi bạn chấp nhận
            </div>
            <div style={{marginTop :12, gap: 36}} className={"c-flex-center"}>
                {/* decline call */}
                <div onClick={()=> {
                    props?.setInComingCall(()=> false)
                    socketState.emit("decline_call", {call_id: props?.call_id, idConversation: props?.idConversation})

                }} className={"c-flex-center"} style={{flexDirection: 'column', cursor: "pointer"}}>
                    <div style={{width :40, height: 40, borderRadius: "50%", background: '#ff443d'}} className={"c-flex-center"}>
                        <AiOutlineClose style={{color: "#fff", width: 24, height: 24}} />
                    </div>
                    <div style={{fontSize: 12, marginTop: 8}}>
                        Từ chối
                    </div>
                </div>
                {/* accept call */}
                <div onClick={()=> {
                    props?.setInComingCall(()=> false)
                    socketState.emit("accept_call", {call_id: props?.call_id, idConversation: props?.idConversation})
                }} className={"c-flex-center"} style={{flexDirection: 'column', cursor: "pointer"}}>
                    <div style={{width :40, height: 40, borderRadius: "50%", background: "#31cc46"}} className={"c-flex-center"}>
                        <BsFillCameraVideoFill style={{color: "#fff", width: 24, height: 24}} />
                    </div>
                    <div style={{fontSize: 12, marginTop: 8}}>
                        Chấp nhận
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InComingCall
