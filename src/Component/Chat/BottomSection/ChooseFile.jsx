import React, { useContext } from 'react'
import { memo } from 'react'
import {AiFillFileAdd } from "react-icons/ai"
import {BsCardImage } from "react-icons/bs"
import { useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import { AppContext } from '../../../App'
import { SocketContainerContext } from '../../../SocketContainer/SocketContainer'
import {uploadImageClient} from "../../../firebase/config"
import post_message from '../../../api/message/post_message'
import Cookies from 'js-cookie'
import update_last_conversation_id from '../../../api/coversation/update_last_conversation_id'
import {MdKeyboardVoice} from "react-icons/md"
import { useAudioRecorder } from 'react-audio-voice-recorder'
import SendVoice from './SendVoice'
// import { useState } from 'react'

const ChooseFile = (props) => {
  const recorderControls = useAudioRecorder();
  const {socketState}= useContext(SocketContainerContext)
  const {data }= useContext(AppContext)
  const {idConversation }= useParams()
  // send image
  const sendImage= async (e)=> {
    const messageImg= await uploadImageClient(e.target.files[0])
    socketState.emit("message_from_client", {message: messageImg, roomId: idConversation, sender: data, type_message: "image", key: v4(), createdAt: new Date()})
    post_message(Cookies.get("uid"), idConversation, v4(), messageImg, idConversation, "image")
    update_last_conversation_id(idConversation)
  }
  // send file
  const sendFile= async (e)=> {
    const messageImg= await uploadImageClient(e.target.files[0])
    socketState.emit("message_from_client", {message: messageImg, roomId: idConversation, sender: data, type_message: "file", key: v4(),name_file: e.target.files[0].name, createdAt: new Date()})
    post_message(Cookies.get("uid"), idConversation, v4(), messageImg, idConversation, "file", e.target.files[0].name )
    update_last_conversation_id(idConversation)
  }
  // send voice message
  const sendVoiceMessage= async(url)=>{
    socketState.emit("message_from_client", {message: url, roomId: idConversation, sender: data, type_message: "audio", key: v4(), createdAt: new Date()})
    post_message(Cookies.get("uid"), idConversation, v4(), url, idConversation, "audio", "" )
  
  }
  return (
    <div className={"jfdskajdfkdfjkdasa"} style={{display: "flex", justifyContent: "center", alignItems: 'center', gap: 10, paddingRight: 16}}>
        <div title={"Chọn ảnh"} style={{width: 36, height: 36, borderRadius: "50%", border: "1px solid #d7d7d7", display: "flex", justifyContent: "center", alignItems: "center", position: "relative"}}>
          <BsCardImage color={"#555"} />
          <input onChange={sendImage} type="file" className={"dfjfjskfdjdkadfdsd"} style={{width: "100%", height: "100%", opacity: 0, position: "absolute", top: 0, left: 0, cursor: "pointer"}} />
        </div>
        <div title={"Chọn file"} style={{width: 36, height: 36, borderRadius: "50%", border: "1px solid #d7d7d7", display: "flex", justifyContent: "center", alignItems: "center", position: "relative"}}>
          <AiFillFileAdd color={"#555"} />
          <input onChange={sendFile} type="file" className={"dfjfjskfdjdkadfdsd"} style={{width: "100%", height: "100%", opacity: 0, position: "absolute", top: 0, left: 0, cursor: "pointer"}} />
        </div>
        <div title={"Gửi audio"} style={{width: 36, height: 36, borderRadius: "50%", border: "1px solid #d7d7d7", display: "flex", justifyContent: "center", alignItems: "center", position: "relative"}}>
          <MdKeyboardVoice color={"#555"} style={{width: 16, height: 16}} />
          <button onClick={recorderControls.startRecording} type="file" className={"dfjfjskfdjdkadfdsd"} style={{width: "100%", height: "100%", opacity: 0, position: "absolute", top: 0, left: 0, cursor: "pointer"}}>
          </button>          
          <SendVoice sendVoiceMessage={sendVoiceMessage} recorderControls={recorderControls} />
        </div>
    </div>
  )
}

export default memo(ChooseFile)
