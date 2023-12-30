import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../App'
import Avatar from './Avatar'
import DetailProfile from './DetailProfile'
import {AiFillMessage,AiFillHome } from "react-icons/ai"
import {FaUserFriends } from "react-icons/fa"
import{FiSettings,FiLogOut} from "react-icons/fi"
import { useNavigate } from 'react-router-dom'
import {GrClose}from "react-icons/gr"
import OutsideClickHandler from 'react-outside-click-handler'
import { Button } from 'react-bootstrap'
import logout from '../../api/logout'
import get_last_conversation_id from '../../api/coversation/get_last_conversation_id'
import { SocketContainerContext } from '../../SocketContainer/SocketContainer'
import Cookies from 'js-cookie'
import _ from 'lodash'
import update_seen_request from '../../api/update_seen_request'
import swal from 'sweetalert'

const Profile = () => {  
  const [open, setOpen]= useState(()=> false)
  const [openSetting, setOpenSetting]= useState(()=> false)
  const {data }= useContext(AppContext)
  const {socketState }= useContext(SocketContainerContext)
  const [unSeenDefault, setUnSeenDefault]= useState(data?.seenRequest)
  const [newRequestFriends, setNewRequestFriends]= useState([])
  useEffect(()=> {
    window.addEventListener("beforeunload", handleBeforeUnload)
    return ()=> {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  })

  useEffect(()=> {
    
    socketState?.on("new_request_friend", data=> {
      if(Cookies.get("uid")=== data?.destination_user_id) {
        setNewRequestFriends(prev=> (_.set([...prev, data?.sender_user_id])))
      }
    })
  }, [socketState])

  const handleBeforeUnload= (e)=> {
    e.preventDefault()
    update_seen_request(Cookies.get("uid"), parseInt(newRequestFriends.length) + unSeenDefault)
  }
  const handleClose= ()=> {
    setOpen(()=>  false)
  }
  return (
    <div className={"dkdjakdjskdasadsd"} style={{height: "100vh", width: 80}}>
      <div className={"dsjkdjaksljkfada"} style={{width: "100%", height: '100%', background: "#2e89ff", padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column"}}>
        <div>
          {/* <button onClick={()=> setNewRequestFriends(prev=> prev+ 1)}>Click</button> */}
          <Avatar setOpen={setOpen} avatar={data?.profilePicture} />
          {
            <DetailProfile open={open} handleClose={handleClose} />
          }
          <ToChatPage />
          <ToFriendPage newRequestFriends={newRequestFriends} setNewRequestFriends={setNewRequestFriends} unSeenDefault={unSeenDefault} setUnSeenDefault={setUnSeenDefault} />
          <ReloadApp />
        </div>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div onClick={()=> setOpenSetting(()=> true)} style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"}} className={"fjldjsgjkjdklgjklrsd"}>
            <FiSettings style={{color: "#fff", width: 32, height: 32}} />
          </div>
          {
            openSetting && 
            <SettingsPage open={openSetting} setOpen={setOpenSetting} />
          }
        </div>
      </div>
    </div>
  )
}

const ToChatPage= ()=> {
  const [data, setData]= useState()
  const navigate= useNavigate()
  useEffect(()=> {
    get_last_conversation_id(setData)
  }, [])

  return (
    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%", padding: "20px"}}>
      <div onClick={()=> navigate("/chat/"+ data?.lastConversationId || "")} title={"Chat"} style={{display: "flex", justifyContent :"center", alignItems: 'center'}}>
        <AiFillMessage color={'#fff'} style={{width: 32, height: 32, color: "#fff", cursor: "pointer"}} />
      </div>
    </div>
  )
}

const ToFriendPage= (props)=> {
  const navigate= useNavigate()
  const [seenAll, setSeenAll]= useState(false)
  return (
    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%", padding: "20px"}}>
      <div onClick={()=> {
        navigate("/friends")
        setSeenAll(()=> true)
        update_seen_request(Cookies.get("uid"), 0)
        props?.setUnSeenDefault(0)
        props?.setNewRequestFriends([])

      }} title={(props?.newRequestFriends?.length + (parseInt(props?.unSeenDefault) || 0)) > 0 ? `${(props?.newRequestFriends?.length + (parseInt(props?.unSeenDefault) || 0))} new request` : "Friends"} style={{display: "flex", justifyContent :"center", alignItems: 'center', position: "relative"}}>
        <FaUserFriends color={'#fff'} style={{width: 32, height: 32, color: "#fff", cursor: "pointer"}} />
        {
          seenAll=== false && <>
            {
              (parseInt(props?.newRequestFriends?.length) + (parseInt(props?.unSeenDefault) || 0)) > 0 &&
              <div style={{position: "absolute", top: "-50%", right: "-50%", backgroundColor: "red", width: 24, height: 24, borderRadius: "50%", color: "#fff"}} className={"c-flex-center"}>
              {(props?.newRequestFriends?.length + (parseInt(props?.unSeenDefault) || 0))}
            </div>
          }
          </>
        }
      </div>
    </div>
  )
}

const SettingsPage= (props)=> {
  return (
    <div className={"dsjdkjfkdlfjdmskdgm"} style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", left: 0, top: 0, background: "rgba(0, 0, 0, 0.3)", zIndex: 10}}>
      <OutsideClickHandler onOutsideClick={()=> props?.setOpen(()=> false)}>
        <div className={"DSkkjfkdjskljfdas"} style={{maxWidth: 300, width: "100vw", background: "#fff", padding: 10, borderRadius: 10}}>
          <div className={"jdjadkjgkddssa"} style={{width: '100%', height: 68, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <strong>Cài đặt</strong>
              <div style={{display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer"}} onClick={()=> props.setOpen(()=> false)}>
                <GrClose />
              </div>
          </div>
          <div onClick={()=> logout()} style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 8}}>
            <Button className={"fjsdhkjhjkdsdsafdda"} variant="outline-primary"><FiLogOut style={{color: "#2e89ff"}} />&nbsp;Đăng xuất</Button>
          </div>
          <div onClick={()=> {}} style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button onClick={()=> {
              swal("Thông báo", "Chức năng đang được phát triển", "error")
            }} className={"fjsdhkjhjkdsdsafdda"} variant={"outline-danger"}><FiLogOut style={{color: "#fff"}} />&nbsp;Xóa tài khoản</Button>
          </div>
            
        </div>
      </OutsideClickHandler>
    </div>
  )
}

const ReloadApp= ()=> {
  
  return (
    <div title={"reload"} style={{display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%", padding: "20px"}}>
      <div onClick={()=> window.location.reload()} style={{display: "flex", justifyContent :"center", alignItems: 'center'}}>
        <AiFillHome color={'#fff'} style={{width: 32, height: 32, color: "#fff", cursor: "pointer"}} />
      </div>
    </div>
  )
}


export default Profile  