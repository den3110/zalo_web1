import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { GrClose } from 'react-icons/gr'
import OutsideClickHandler from 'react-outside-click-handler'
import { useNavigate } from 'react-router-dom'
import delete_member_id from '../../api/coversation/delete_member_id'
import get_conversation_friends from '../../api/coversation/get_conversation_friends'
import make_conversation from '../../api/coversation/make_conversation'
import get_list_friend_rebuild from '../../api/friend/get_list_friend_rebuild'
import unfriend from '../../api/friend/unfriend'
import Avatar from '../Home/Avatar'
import CoverPhoto from '../Home/CoverPhoto'
import { NameProfile } from '../Home/DetailProfile'
import { ImageItemList, Name } from './List'

const ListFriend = (props) => {
  return (
    <div className={"skdjkfjdkdjsdas"}style={{width:" 100%", height: "calc(100% - 60px)", overflow: "auto"}}>
      <RequestByMe />
      <RequestByUserToMe />
      <ListFriendItem />
    </div>
  )
}

const RequestByMe= (props)=> {
  const navigate= useNavigate()

  return (
    <div onClick={()=> navigate("/friends/request/to/me")} className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
      <img src={"https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png"} alt="" style={{width: 48, height: 48, objectFit: "cover", borderRadius: "50%"}} />
      <div className={"fdjfkjkajawas"} style={{fontSize: 18}}>Danh sách kết bạn</div>
    </div>
  )
}

const RequestByUserToMe= (props)=> {
  const navigate= useNavigate()

  return (
    <div onClick={()=> navigate("/friends/request/by/me")} className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
      <img src={"https://chat.zalo.me/assets/group@2x.2d184edd797db8782baa0d5c7a786ba0.png"} alt="" style={{width: 48, height: 48, objectFit: "cover", borderRadius: "50%"}} />
      <div className={"fdjfkjkajawas"} style={{fontSize: 18}}>Danh sách yêu cầu kết bạn</div>
    </div>
  )
}

export const ListFriendItem= (props)=> {
  const [data, setData]= useState()
  useEffect(()=> {
    get_list_friend_rebuild(setData)
  }, [])

  return (
    <>
      <div className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
        <div style={{fontSize: 18}}>Danh sách bạn bè</div>
      </div>
      {
        data?.data?.friends?.map((item, key)=> <ListFriendComponent  setArrayMember={props?.setArrayMember} arrayMember={props?.arrayMember} is_invite={props?.is_invite} key={key} {...item} />)
      }
    </>
  )
}


export const ListFriendComponent= (props)=> {
  const [open, setOpen]= useState(()=> false)
  return (
    <div onClick={()=> setOpen(prev=> !prev)} className={"fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
        {/* s1 */}
        <div className={"jskdjksjkgfddas"} style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10}}>
            <ImageItemList {...props } imageGroup={props?.profilePicture?.length > 0 ? props?.profilePicture : "https://forum.truckersmp.com/uploads/monthly_2022_05/imported-photo-240240.thumb.png.974ffed93b3286f4e60938fb8c7ec38e.png"} />
            <Name {...props} label={props?.username} />
            {
              props?.is_group=== true && <>
                {
                  props?.isHostGroup=== true && (props?._id === props?.my_id) && <div>(Bạn)</div>
                }
                {
                  props?.isHostGroup=== false && (props?._id === props?.my_id) && <div>(Bạn)</div>
                }
              </>
            }
        </div>
        {/* s2 */}
        <div className={"fjklsjklfjsksajas"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {
              props?.is_invite=== true && <Button onClick={(e)=> {
                e.stopPropagation()
                props?.setArrayMember(prev=> [...prev, props?._id])
              }} disabled={props?.arrayMember?.includes(props?._id) ? true : false} variant={"primary"}>{props?.arrayMember?.includes(props?._id) ? "Đã thêm" : "Thêm"}</Button>
            }
            {
              props?.is_group=== true && props?.isHostGroup=== true  && (props?._id !== props?.my_id) && <>
                <Button onClick={async (e)=> {
                  e.stopPropagation()
                  await delete_member_id(props?._id, props?.id_conversation, props?.setResult)
                  }} color={"primary"} style={{whiteSpace: "nowrap"}}>Xóa thành viên</Button>
              </>
            }            
        </div>
        {open=== true && <PopupAddFriends open={open} setOpen={setOpen} {...props} />}
    </div> 
  )
}


export const PopupAddFriends= (props)=> {
  const [data, setData]= useState()
  // eslint-disable-next-line
  const [data2, setData2]= useState()
  const [newConversation, setNewConversation]= useState()
  const navigate= useNavigate()
  useEffect(()=> {
    if(props._id) {
      get_conversation_friends(props._id, setData)
    }
  }, [props._id])
  
  const unfriend_f= async ()=> {
    await unfriend(props?._id, setData2)
    window.location.reload()
  }
  return (
      <div className={"fkjldsklkdsslaskdsaa"} style={{width: "100%", height: "100%", position: "fixed", top: 0, left: 0, background: "rgba(0 ,0 ,0,0.3)", zIndex: 12, display: "flex", justifyContent: "center", alignItems: "center"}}>
          <OutsideClickHandler onOutsideClick={()=> props.setOpen((()=> false))}>
              <div className={"fjlkdsjdkljsdklaskd"} style={{padding: 16, background: "#fff", borderRadius: 5, width: "100vw", maxWidth: 450}}>
                  <div style={{width: "100%", height: "100%"}}>   
                      <div className={"jdjadkjgkddssa"} style={{width: '100%', height: 68, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div className={"dkldjskldjkasdasa"} style={{fontWeight: 600, fontSize: 18}}>
                          {props.username}
                        </div>
                        <div onClick={()=> props.setOpen((()=> false))} style={{display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer", padding: 10}}>
                          <GrClose onClick={()=> props.setOpen((()=> false))} />
                        </div>
                      </div>
                      <CoverPhoto coverPhoto={props?.coverPhoto} />
                      <Avatar avatar={props?.profilePicture} />
                      <NameProfile username={props?.username} />
                      <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 16}}>
                        <Button onClick={async ()=> {
                          if(data.id_conversation) {
                            navigate("/chat/"+ data?.id_conversation)
                          }
                          else {
                            await make_conversation(undefined, [props?._id, Cookies.get("uid")], Cookies.get("uid"), undefined, setNewConversation, navigate)
                          }
                        }} variant="primary">Nhắn tin</Button>
                        <Button onClick={unfriend_f} variant="secondary">Hủy kết bạn</Button>
                      </div>
                      <br />
                  </div>
              </div>
          </OutsideClickHandler>
      </div>
  )
}


export default ListFriend