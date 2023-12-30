import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import accpet_add_friends from '../../api/friend/accpet_add_friends'
import cancel_request_make_friend_from_me from '../../api/friend/cancel_request_make_friend_from_me'
import denied_request_friends from '../../api/friend/denied_request_friends'
import get_list_user_send_request_add_friend_of_me from '../../api/friend/get-list-user-send-request-add-friend-of-me'
import get_list_user_request_make_friend_to_me from '../../api/friend/get_list_user_request_make_friend_to_me'
import update_seen_request from '../../api/update_seen_request'
import SearchAndList from '../SearchAndList/SearchAndList'

const FriendPage = (props) => {
  return (
    <div className={"fkjsdkljdsaklasjas"} style={{display: "flex"}}>
      <SearchAndList is_friend_page={true} />
      <div style={{flex: " 1 1 0"}} className={"fnjkdhjsjhdslkjsas"}>
        <Routes>
          <Route path={"/"} element={<Navigate replace={true} to={"/friends/request/to/me"} />} />
          <Route path={"/request/by/me"} element={<ComponentRequestByMe />} />
          <Route path={"/request/to/me"} element={<ComponentRequestToMe />} />
        </Routes>
      </div>
    </div>
  )
}

const ComponentRequestByMe= (props)=> {
  const [data, setData]= useState(()=> [])
  const [change, setChange]= useState(()=> false)
  useEffect(()=> {
    get_list_user_send_request_add_friend_of_me(setData)
  }, [change])
  return (
    <div className={"fdjkjskljdkalsjasas"} style={{padding: "16px 16px 0 16px"}}>
      <Title title={"Danh sách yêu cầu được kết bạn"} />
      {
        data?.data?.length <= 0 && <div style={{textAlign: "center"}}>Không có người nào trong danh sách này</div>
      }
      {
        data?.data?.length > 0 && data?.data?.map((item, key)=> <ItemUser {...item} key={key} setChange={setChange} />)
      }
    </div>
  )
}


//
const ComponentRequestToMe= (props)=> {
  const [data, setData]= useState(()=> [])
  const [change, setChange]= useState(()=> false)
  useEffect(()=> {
    update_seen_request(Cookies.get("uid"), 0)
  }, [])
  useEffect(()=> {
    get_list_user_request_make_friend_to_me(setData)
  }, [change])
  return (
    <div className={"fjsdhukdhjaeshdnasas"} style={{padding: "16px 16px 0 16px"}}>
      <Title title={"Danh sách yêu cầu kết bạn"} />
      {
        data?.data?.friendsQueue?.length <= 0 && <div style={{textAlign: "center"}}>Không có người nào trong danh sách này</div>
      }
      {
        data?.data?.friendsQueue?.length > 0 && data?.data?.friendsQueue?.map((item, key)=> <ItemUserForme {...item} key={key} setChange={setChange} />)
      }
    </div>
  )
}

const Title= (props)=> {
  return (
    <div style={{height: 50, display: "flex", alignItems: 'center', fontSize: 20, fontWeight: 600}}> 
      {props.title}
    </div>
  )
}

const ItemUser= (props)=> {
  return (
    <div className={"dskjdsakldjskdlasasas"} style={{ width: '100%', padding: 16}}>
      <div className={"fjkldjskldjassa"} style={{width: "100%", padding: 10, background: "#f2f0f5", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 5, }}>
        <div className={"fsjkdajdkjfkdajsdas"} style={{display: "flex", justifyContent: "center", alignItems: 'center', gap: 10}}>
          <img src={props?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" style={{width: 48, height: 48, objectFit: "cover", borderRadius: "50%"}} />
          <div className={"fdjkldjksldjaksdjsf"}>
            <div className={"fkjldjskjdasaas"} style={{marginBottom:8}}>{props?.username}</div>
            <div>Bạn đã gửi lời mời kết bạn cho người này</div>
          </div>
        </div>
        {/*  */}
        <div className={"fjdakdsjkgfjksdd"} style={{display: "flex", justifyContent: "center", alignItems: 'center'}}>
          <Button onClick={()=> cancel_request_make_friend_from_me(props?._id, props?.setChange)} color={"primary"} variant="secondary">Hủy yêu cầu</Button>
        </div>
      </div>
    </div>
  )
}

const ItemUserForme= (props)=> {
  const [message, setMessage]= useState("")

  return (
  <div className={"dskjdsakldjskdlasasas"} style={{ width: '100%', padding: 16}}>
      <div className={"fjkldjskldjassa"} style={{width: "100%", padding: 10, background: "#f2f0f5", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 5, }}>
        <div className={"fsjkdajdkjfkdajsdas"} style={{display: "flex", justifyContent: "center", alignItems: 'center', gap: 10}}>
          <img src={props?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" style={{width: 48, height: 48, objectFit: "cover", borderRadius: "50%"}} />
          <div className={"fdjkldjksldjaksdjsf"}>
            <div className={"fkjldjskjdasaas"} style={{marginBottom:8}}>{props?.username}</div>
            <div>{message?.length <=0 && "Đã gửi lời mời kết bạn đến bạn"}{message?.length >0 && message}</div>
          </div>
        </div>
        {/*  */}
        <div className={"fjdakdsjkgfjksdd"} style={{display: "flex", justifyContent: "center", alignItems: 'center', gap: 16}}>
          {message?.length <=0 && 
            <>
              <Button onClick={()=> accpet_add_friends(props?._id, setMessage)} color={"primary"} variant="primary">Chấp nhận</Button>
              <Button onClick={()=> denied_request_friends(props?._id, setMessage)} color={"primary"} variant="secondary">Từ chối</Button>
            </>
            }
        </div>
      </div>
    </div>
  )
}

export default FriendPage