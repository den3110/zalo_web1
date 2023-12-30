import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import get_files_conversation from "../../api/coversation/get_files_conversation";
import get_info_detail_conversation from "../../api/coversation/get_info_detail_conversation";
import { SocketContainerContext } from "../../SocketContainer/SocketContainer";
import MainChat from "../Chat/MainChat";
import SearchAndList from "../SearchAndList/SearchAndList";
import VideoCallComponent from "../VideoCall/VideoCall";
// import VideoCallComponent from "../VideoCall/VideoCall";
import { isMobile } from 'react-device-detect';

const ChatPage = () => {
  const { idConversation } = useParams();
  const [conversation, setConversation] = useState();
  const [change, setChange] = useState(false);
  const [extend, setExtend] = useState(false);
  const [isCall, setIsCall] = useState(false);
  const [callId, setCallId] = useState("");
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const navigate= useNavigate();
  const { socketState } = useContext(SocketContainerContext);
  useEffect(() => {
    socketState.emit("join_room_conversation", { roomId: idConversation });
  }, [socketState, idConversation]);
  useEffect(() => {
    get_info_detail_conversation(idConversation, setConversation);
  }, [idConversation, change]);
  useEffect(() => {
    socketState.on("decline_call_signal", (data) => {
      setIsCall(() => false);
    });
  }, [socketState]);
  useEffect(() => {
    socketState.on("accept_call_signal", (data) => {
      if(isMobile=== true) {
        setCallId(data?.call_id);
        setIsCall(() => true);
        navigate("/call/"+ data?.idConversation)
        return
      }
      else {
        setCallId(data?.call_id);
        setIsCall(() => true);
      }
    
    });
  }, [socketState]);
  useEffect(() => {
    socketState.on("end_call_from_user", (data) => {
      setIsCall(() => false);
    });
  }, [socketState]);
  return (
    <div className={"fkdjkfjkdlsasa"} style={{ display: "flex" }}>
      <SearchAndList is_chat_page={true} isCall={isCall} />
      {isCall === true && (
        <VideoCallComponent channelName={callId} video={video} audio={audio} />
      )}
      <MainChat
        setCallId={setCallId}
        isCall={isCall}
        setIsCall={setIsCall}
        setExtend={setExtend}
        setChange={setChange}
        conversation={conversation}
        setVideo={setVideo}
        setAudio={setAudio}
      />
      {extend === true && <StorageFile />}
    </div>
  );
};

const StorageFile = () => {
  const [data, setData] = useState([]);
  const { idConversation } = useParams();
  // const [activePage, setActivePage]= useState(false)
  useEffect(() => {
    get_files_conversation(idConversation, setData);
  }, [idConversation]);

  return (
    <div
      className={"dskjdskdjskdsasa"}
      style={{ width: 300, height: "100vh", borderLeft: "1px solid #e7e7e7" }}
    >
      <div
        className={"ssjdkjdskjsakssd"}
        style={{
          width: "100%",
          height: 60,
          borderBottom: "1px solid #e7e7e7",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
        }}
      >
        Kho lưu trữ
      </div>
      {/* <div style={{width: '100%', padding: "0"}} className={"c-flex-center"}>
      <div onClick={()=> setActivePage(false)} style={{padding: 16, flex: "1 1 0", borderBottom: activePage=== false ? "3px solid #2e89ff" : "3px solid transparent", background: activePage=== false ? "#f2f0f5" : "#fff", cursor: "pointer"}} className={"c-flex-center"}>Ảnh</div>
      <div onClick={()=> setActivePage(true)} style={{padding: 16, flex: "1 1 0", borderBottom: activePage=== true ? "3px solid #2e89ff" : "3px solid transparent", background: activePage=== true ? "#f2f0f5" : "#fff", cursor: "pointer"}} className={"c-flex-center"}>File</div>
    </div> */}
      <div style={{ height: "calc(100vh - 60px)", overflow: "auto" }}>
        <div style={{ padding: 5, fontSize: 18, fontWeight: 600 }}>Ảnh</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {data?.media
            ?.filter((item) => item?.type_message === "image")
            ?.map((item, key) => (
              <div style={{ width: "calc(100% / 3)", padding: 5 }} key={key}>
                <Link to={"/media/" + item?.key}>
                  <img
                    src={item.message}
                    style={{ width: "100%", aspectRatio: 1 / 1 }}
                    alt=""
                  />
                </Link>
              </div>
            ))}
        </div>
        <div style={{ padding: 5, fontSize: 18, fontWeight: 600 }}>File</div>
        {data?.media
          ?.filter((item) => item?.type_message === "file")
          ?.map((item, key) => (
            <div
              key={key}
              style={{
                width: "calc(100%)",
                padding: 5,
                height: 50,
                position: "relative",
              }}
            >
              <a
                target={"_blank"}
                style={{ width: "100%", height: "100%" }}
                href={item.message}
                rel="noreferrer"
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "1px solid #e7e7e7",
                    justifyContent: "flex-start",
                    padding: 5,
                  }}
                  className={"c-flex-center"}
                >
                  {item.name_file}
                </div>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatPage;
