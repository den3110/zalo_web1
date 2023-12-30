import React, { useContext } from 'react'
import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../App'
import { SocketContainerContext } from '../../../SocketContainer/SocketContainer'

const TypingText = (props) => {
  const {socketState}= useContext(SocketContainerContext)
  const {data }= useContext(AppContext)
  const {idConversation }= useParams()
  const f= (e)=> {
    props.setContentText(e.target.value)
    if(e.target.value?.length === 1) {
      socketState.emit("typing_from_client_on", {roomId: idConversation, data, typing: true})
    }
    else if(e.target.value?.length <= 0) {
      socketState.emit("typing_from_client_off", {roomId: idConversation, data, typing: false})
    }
    
  }
  return (
    <div className={"fjdkfjkdjdkjskds"} style={{flex: "1 1 0", display: "flex", justifyContent:" center", alignItems: "center"}}>
      <input onKeyUp={(e)=> {
        if(e.key=== "Enter") {
          if(e.target.value.trim().length > 0) {
            props?.sendMessage()
          }
        }
      }} onChange={f} value={props.contentText} type="text" style={{width: "100%", height: 40, outlineColor: "#2e89ff", border: "1px solid #e7e7e7", borderRadius: 80, padding: 10}} placeholder={"Nhập tin nhắn..."} />
    </div>
  )
}

export default memo(TypingText)
