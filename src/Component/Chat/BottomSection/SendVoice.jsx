import Cookies from "js-cookie";
import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useParams } from "react-router-dom";
import send_voice from "../../../api/coversation/send_voice";
// import { uploadVoiceClient } from "../../../firebase/config";
import "./SendVoice.sass"

const SendVoice = (props) => {

  const addAudioElement = async (blob) => {
    const formData= new FormData()
    formData.append("voice", blob)
    const {voice}= await send_voice(formData)
    const audio = document.createElement("audio");
    audio.src = voice;
    props?.sendVoiceMessage(voice)
  }
  return (
    <div style={{position: "relative"}}>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={props?.recorderControls}
        classes={"audio-record"}
      />
    </div>
  );
};

export default SendVoice;
