import Cookies from 'js-cookie'
import React, { memo, useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import get_list_conversation from '../../api/coversation/get_list_conversation'
import Fuse from 'fuse.js'
import { SocketContainerContext } from '../../SocketContainer/SocketContainer'
import _ from "lodash"
import moment from 'moment'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const List = (props) => {
    const [audio, setAudio] = useState(new Audio('https://static.xx.fbcdn.net/rsrc.php/yR/r/lvSDckxyoU5.ogg'));
    // const audioRef = useRef(null);
    const {idConversation}= useParams()
    const {socketState }= useContext(SocketContainerContext)
    const [data, setData]= useState([])
    // const audioContext = new AudioContext();
    
    useEffect(()=> {
        get_list_conversation(setData)
    }, [props?.change, props.is_friend_page])
    // useEffect(()=> {
    //     if(data.length > 0) {
    //         socketState.on("send_new_message_from_server", (data2)=> {
                   
    //             const index= data.findIndex(item=> item.id_conversation === data2?.idConversation)
    //             console.log(index)
    //             if(parseInt(index) >= parseInt(0)) {
    //                 console.log("done")
    //                 const audio= document.createElement("audio")
    //                 document.body.appendChild(audio)
    //                 audio.preload= "auto"
    //                 audio.volume= 1
    //                 audio.src= "https://static.xx.fbcdn.net/rsrc.php/yR/r/lvSDckxyoU5.ogg"
    //                 audio.style= {widht: "300px", heihgt: "200px"}
    //                 audio.controls= true
    //                 audio.autoplay= true
    //                 // const source = audioContext.createMediaElementSource(audioRef.current);
    //                 // const gainNode = audioContext.createGain();
    //                 // source.connect(gainNode);
    //                 // gainNode.connect(audioContext.destination);
                
    //                 // gainNode.gain.value = 0.5;
                
    //                 // audioRef.current.play()
    //             } 
                
    //         })
    //     }
    // }, [socketState, data.length])
    useEffect(()=> {
        if(data.length > 0 ) {
            socketState.on("newest_message", (data2)=> {
                const index= data.findIndex(item=> item.id_conversation === data2?.roomId) 
                if(index >= 0) {
                    const updateData= [...data.slice(0, index), {...data[index], lastUpdate: data2?.lastUpdate}, ...data.slice(index + 1)]
                    setData(()=> updateData)
                }
            })
            socketState.on("newest_message_sound", (data2)=> {
                const index= data.findIndex(item=> item.id_conversation === data2?.roomId) 
                if(index >= 0) {
                    audio.play();
                }
            })
        }
    }, [socketState, data])
    const options = {
        keys: [
            { name: 'label', getFn: (book) => book.label },
            // { name: 'username', getFn: (book) => book.member?.map(item=> item.username) }
          ]
      };
      
      const fuse = new Fuse(data, options);
      // Change the pattern
      function searchByLabel(searchTerm) {
        // Filter the data to only include items with matching labels

        const results = data?.filter(item => item?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
        return results;
      }

      function searchByMember(searchTerm) {
        // Filter the data to only include items with members that have matching usernames
        const results = data?.filter(item=> item?.label=== undefined )?.filter(item => item?.member?.some(member => member?.username?.toLowerCase()?.includes(searchTerm.toLowerCase())));
        return results;
      }

      function finalSearch(searchTerm) {
        const search1= searchByLabel(searchTerm)
        const search2= searchByMember(searchTerm)
        return search1.concat(search2)
      }
  return (
    <div className={"skdjkfjdkdjsdas"}style={{width:" 100%", height: "calc(100% - 60px)", overflow: "auto"}}>
       {
        <div style={{textAlign: "center"}}>
            {props?.isSearching=== true && props?.data?.length <=0 && props?.search_conversation!== true && "Không tìm thấy kết quả phù hợp"}
        </div>
       }
       {
        <div style={{textAlign: "center"}}>
            {props?.isSearching=== true && props?.data?.length <=0 && props?.search_conversation=== true && finalSearch(props?.searchQuery).length <= 0&& "Không tìm thấy kết quả phù hợp"}
        </div>
       }
       {/* search */}
       {
            props?.isSearching=== true && props?.searchQuery?.length > 0 && data?.length > 0 && finalSearch(props?.searchQuery)?.map((item, key)=> <ItemList key={key} {...item} />)
       }
       {
        <div style={{textAlign: "center"}}>
           { props?.isSearching=== false && data?.length<= 0 && "Bạn không có cuộc hội thoại nào."}
        </div>
       }
       {/* list conversation */}
       {
            props?.isSearching=== false && data?.length> 0 &&
            <TransitionGroup>
                {
                    _.orderBy(data, function(e) {return moment(e.lastUpdate, "D/M/YYYY, H:mm:ss A").valueOf()}, "desc")?.map((item, key)=> 
                        <CSSTransition
                            key={item?.id_conversation}
                            timeout={500}
                            classNames="item"
                        >

                            <ItemList idConversation={idConversation} socketState={socketState} {...item} />
                        </CSSTransition>
                    
                    )

                }
            </TransitionGroup>
       }
       {/* <audio ref={audioRef} src="https://static.xx.fbcdn.net/rsrc.php/yR/r/lvSDckxyoU5.ogg"></audio> */}
    </div>
  )
}

const ItemList= memo((props)=> {
    const {socketState, idConversation} =props
    const [newMessageSignal, setNewMessageSignal]= useState(false)

    useEffect(()=> {
        if(idConversation && socketState && props?.id_conversation) {
            if(idConversation!==props?.id_conversation) {
                socketState.on("send_new_message_from_server", (data)=> {
                    
                    if(data?.idConversation === props?.id_conversation && data?.idConversation!== idConversation && idConversation!==props?.id_conversation)  {
                        setNewMessageSignal(()=> true)
                    }
                })
            }
        }
    }, [idConversation, props?.id_conversation])

    return (
        <NavLink onClick={()=> {
            setNewMessageSignal(()=> false)
        }} style={{textDecoration: "none", color: "#000"}} className={({isActive})=> isActive ? "fdsgfsdgfdsdas fhjsdjsfkdjdfklsjdsa" : "fdsgfsdgfdsdas dajksdjskldjaksljaklasa"} to={"/chat/"+ props?._id}>
            <div className={`fjsdjljkgjhdlsjhdas ${newMessageSignal=== true ? "skdsdkldadskaldgsd" : "kalaskalsfsasas"} ${props?.id_conversation=== idConversation ? "dsjlkdjksdajskfjksa" : "agatareasegffsdda"}`} style={{width: "100%", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
                {/* s1 */}
                <div className={"jskdjksjkgfddas"} style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10}}>
                    <ImageItemList {...props } />
                    <Name {...props} />
                </div>
                {/* s2 */}
                <div className={"fjklsjklfjsksajas"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {
                        newMessageSignal=== true && <div style={{width: 10, height: 10, borderRadius: "50%", background: "#2e89ff"}}></div>
                    }
                </div>
            </div>
        </NavLink>
    )
})


export const ImageItemList= (props)=> {
    return (
        <div className={"djklsjkdjvsdddasa"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img src={props?.imageGroup ? props?.imageGroup : (props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.profilePicture?.length > 0 ? props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")} alt="" style={{width: 56, height: 56, objectFit: "cover", borderRadius: "50%"}} />
        </div>
    )
}

export const Name= (props)=> {
    return (
        <div className={"fjklsajkjfksaasafsd"} style={{display: "flex", alignItems: "center"}}>
            <div className={"fldsajkjdfkldjasa"} style={{fontSize: 18}}>
                {props?.label ? props?.label : (props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.username?.length > 0 ? props?.member?.filter(item=> item?._id !== Cookies.get("uid"))?.[0]?.username : "Anonymous") }
            </div>
        </div>
    )
}

export default memo(List)
