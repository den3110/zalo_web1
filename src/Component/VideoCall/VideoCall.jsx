import React, { memo, useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import Cookies from "js-cookie";
import "./style.sass"
import axios from "axios";
import { SERVER_URL } from "../../config/config";
import {BsFillMicFill, BsFillMicMuteFill, BsCameraVideoFill, BsCameraVideoOffFill} from "react-icons/bs"
import {MdCallEnd } from "react-icons/md"
import { useContext } from "react";
import { SocketContainerContext } from "../../SocketContainer/SocketContainer";
import { useCallback } from "react";
import Draggable from 'react-draggable';

const VideoCallComponent = (props) => {
    const {channelName, audio, video }= props
    const appId = "019c2968a3da4efab5e709e7886b86c8"; //ENTER APP ID HERE
    const [uid, setUid]= useState("")
    const appCertificate = "cfc8747ffd6040ad89bf114dcded44b5"
    const [token, setToken]= useState("")
    const [inCall, setInCall] = useState(true);
    useEffect(()=> {
      (async()=> {
          try {
              const res1= await axios({
                url: SERVER_URL+ "/api/live/create/uid",
                method: "get",
                headers: {
                  "authorization": "Bearer "+ Cookies.get("accessToken")

                },
                params: {
                  appId, appCertificate, account: Cookies.get("uid")
                }
              })
              const result1= await res1.data
              setUid(result1.uid)
              const res= await axios({
                  url: SERVER_URL+ "/api/live/get_token",
                  method: "get",
                  headers: {
                      "authorization": "Bearer "+ Cookies.get("accessToken")
                  },
                  params: {
                    appId, channelName, appCertificate, uid: result1.uid
                  }
              })
              const result= await res.data
              return setToken(result)
          } catch (error) {
              return console.log(error.message)
          }
          
      })()
  }, [channelName])
    return (
      <div className="video-call-component" style={{width: "100%", maxWidth: 1000, borderRight: "1px solid #e7e7e7"}}>
        { inCall && (
            <VideoCall setInCall={setInCall} channelName={channelName} appId={appId} token={token} uid={uid} video={video} audio={audio} />
          ) 
        }
      </div>
    );
}
// {/* (
//   <ChannelForm setInCall={setInCall} />
// )} */}
const config = {
    mode: "rtc",
    codec: "vp8"
  };

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const VideoCall = (props) => {
  const { setInCall, channelName, appId, token, uid, video, audio } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  // using the hook to get access to the client object
  const client = useClient();
  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  
    useEffect(() => {
    // function to initialise the SDK
    let init = async (channelName) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        // console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        // console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, channelName, token, uid);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
    //   console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks, appId, token, uid]);

  return (
    <div className="wrap-video-conversation" style={{height: "100vh", position: "relative"}}>
      {start && tracks && <Videos users={users} tracks={tracks} />}
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} channelName={channelName} video={video} audio={audio} />
      )}
    </div>
  );
};

const Videos = memo((props) => {
  const { users, tracks } = props;

  return (
    <div className={"wrap-video"} style={{width: "100%"}}>
      <div id="videos" style={{width: "100%"}}>
            
        {/* me */}
        <Draggable>
        <div className={"wrap-me c-flex-center"} style={{width: "25%", aspectRatio: 3 / 2, position: "absolute", bottom: -25, right: 0, flexDirection: "column", padding: 10, zIndex: 99}}>

          <AgoraVideoPlayer
            style={{ height: "95%", width: "95%" }}
            className="vid"
            videoTrack={tracks[1]}
          />
          <div style={{textAlign: "center", marginTop: 8, fontWeight: 600}}>Bạn</div>
        </div>
        </Draggable>

        {/* another user media */}
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: "95%", width: "95%" }}
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
          {
            users?.length <= 0 && 
            <div style={{height: "95%", width: "95%", borderRadius: 10, border: "1px solid #e7e7e7", top: 0, left: 0}}>
              
            </div>
          }
      </div>
    </div>
  );
});

export const Controls = (props) => {

  const {socketState }= useContext(SocketContainerContext)
  const client = useClient();
  const { tracks, setStart, setInCall, channelName, video, audio } = props;
  const [trackState, setTrackState] = useState({ video: video, audio: audio   });

  useEffect(()=> {
    return ()=> {
     (async()=> {
      await client.leave();
      client.removeAllListeners();
      // we close the tracks to perform cleanup
      tracks[0].close();
      tracks[1].close();
      setStart(false);
      setInCall(false);
     })()
    }
  }, [client, setInCall, setStart, tracks])
 
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = useCallback(async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  }, [client, setInCall, setStart, tracks]);
  useEffect(()=> {
    window.onbeforeunload= function(e) {
    leaveChannel()
    socketState.emit("end_call", {call_id: channelName})
    }
  }, [channelName, socketState, leaveChannel])
  return (
    <div className="controls">
      <p className={trackState.audio ? "on mic-on mic-ui" : "mic-off mic-ui"} onClick={() => mute("audio")}>
        {trackState.audio ? <BsFillMicFill style={{marginBottom: 10}} /> : <BsFillMicMuteFill style={{marginBottom: 10}} />}
      </p>
      <p className={trackState.video ? "on camera-on camera-ui" : "camera-off camera-ui"} onClick={() => mute("video")}>
        {trackState.video ? <BsCameraVideoFill style={{marginBottom: 10}} /> : <BsCameraVideoOffFill style={{marginBottom: 10}} />}
      </p>
      {<p className={"end-call"} style={{borderRadius: 80}} onClick={() => {
        leaveChannel()
        socketState.emit("end_call", {call_id: channelName})
      }}>
        <MdCallEnd  />
      </p>}
    </div>
  );
};

export default VideoCallComponent