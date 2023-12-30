import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { memo } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import {AiOutlineUserAdd, AiOutlineUsergroupAdd,AiOutlineSearch,AiFillCamera } from "react-icons/ai"
import { GrClose } from 'react-icons/gr'
import OutsideClickHandler from 'react-outside-click-handler'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import make_conversation from '../../api/coversation/make_conversation'
import send_request_make_friend_by_me from '../../api/friend/send_request_make_friend_by_me'
import search from '../../api/search'
import search_user_by_phone from '../../api/search_user_by_phone'
import { AppContext } from '../../App'
import { IMAGE_GROUP_DEFAULT } from '../../config/config'
import { uploadImageClient } from '../../firebase/config'
import Avatar from '../Home/Avatar'
import CoverPhoto from '../Home/CoverPhoto'
import { NameProfile, ProfileInfo } from '../Home/DetailProfile'
import List from './List'
import ListFriend, { ListFriendItem } from './ListFriend'
import get_friend_status from '../../api/friend/request_status'
import cancel_request_make_friend_from_me from '../../api/friend/cancel_request_make_friend_from_me'

const SearchAndList = (props) => {
  const [searchQuery, setSearchQuery]= useState(()=> "")
  const isSearching=searchQuery.length > 0 ? true : false
  const [change, setChange]= useState(false)
  const [data, setData]= useState()
  
  return (
    <div className={"fkjlasdjsklsajaksas"} style={{width: props?.isCall=== true ? 0 : 350, padding: '16px 0 0 0',height: "100vh", borderRight: "1px solid #e7e7e7"}}>
        <SearchBar isCall={props?.isCall} setChange={setChange} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setData={setData} />
        {
            props.is_friend_page=== true && <ListFriend />
        }
        {/*  */}
        {
            props.is_chat_page=== true &&
            <List search_conversation={true} searchQuery={searchQuery} change={change} is_friend_page={props.is_friend_page} isSearching={isSearching} data={data} />
        }
    </div>
  )
}

const SearchBar= (props)=> {
    
    return (
        <div className={"fmkldjskldjklfsass"} style={{width: "100%", display: props?.isCall=== false ? "flex" : "none", justifyContent: "center", alignItems: "center", position: "relative", marginBottom: 20, padding: "0 16px"}}>
            <MainSearch {...props} />
            <AddFriends />
            <CreateNewGroup setChange={props?.setChange} />
        </div>
    )
}

const MainSearch= (props)=> {
    return (
        <div className={"fjladjkldgjkljdasda"} style={{flex: "1 1 0", height: 40}}>
            <input onKeyUp={(e)=> search(e.target.value, props.setData)} onChange={e=> props.setSearchQuery(e.target.value)} value={props.searchQuery} style={{width: "100%", height: "100%", background: "#d9d9d9", outlineColor: "#2e89ff", borderRadius: 5, padding: "10px 30px"}} placeholder={"Tìm kiếm"} />
            <div style={{display:" flex", justifyContent:" center", alignItems: "center", position: "absolute", top: "50%", left: 0, transform: "translate(50%, -50%)", marginLeft: 16}}>
                <AiOutlineSearch />
            </div>
        </div>
    )
}
const AddFriends= (props)=> {
    const [open, setOpen]= useState(()=> false)
    return (
        <div title={"Thêm bạn"} className={"fkjdjkshklsajass"}style={{cursor: "pointer", width: 40, height: 40, display: "flex", justifyContent:"center", alignItems: "center", marginLeft: 16}}>
            <AiOutlineUserAdd style={{width: 32, height: 32}} onClick={()=> setOpen(()=> true)} />
            {open=== true && <PopupAddFriends open={open} setOpen={setOpen} />}
        </div>
    )
}

const CreateNewGroup= (props)=> {
    const [open, setOpen]= useState(()=> false)
    return (
        <div title={"Tạo nhóm"} className={"fdlkjsjdaklsjfdkaljsa"} style={{cursor: "pointer",width :40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 16}}>
            <AiOutlineUsergroupAdd  style={{width: 32, height: 32}} onClick={()=> setOpen(()=> true)} />
            {open=== true && <PopupMakeConversation setChange={props?.setChange} open={open} setOpen={setOpen} />}
        </div>
    )
}

export const PopupAddFriends= (props)=> {
    const [change, setChange]= useState(false)
    const [phoneNumber, setPhoneNumber]= useState()
    const [data, setData]= useState({exist: -1})
    const [dataSendRequest, setDataSendRequest]= useState()
    const [friendStatus, setFriendStatus]= useState()
    useEffect(() => {
        (async () => {
          const result = await get_friend_status(
           data?._id
          );
          return setFriendStatus(result);
        })();
      }, [data?._id, change])
    return (
        <div className={"fkjldsklkdsslaskdsaa"} style={{width: "100%", height: "100%", position: "fixed", top: 0, left: 0, background: "rgba(0 ,0 ,0,0.3)", zIndex: 12, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <OutsideClickHandler onOutsideClick={()=> props.setOpen((()=> false))}>
                <div className={"fjlkdsjdkljsdklaskd"} style={{padding: 16, background: "#fff", borderRadius: 5, width: "100vw", maxWidth: 450}}>
                    <div style={{width: "100%", height: "100%"}}>   
                        <div className={"jdjadkjgkddssa"} style={{width: '100%', height: 68, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <strong>Thêm bạn</strong>
                            <div style={{display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer"}} onClick={()=> props.setOpen(()=> false)}>
                                <GrClose  />
                            </div>
                        </div>
                        {
                            data?.exist=== true && <>
                                <CoverPhoto coverPhoto={data?.coverPhoto} />
                                <Avatar avatar={data?.profilePicture} />
                                <NameProfile username={data?.username} />
                                <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: 16}}>
                                    {/* {
                                        data?._id !== Cookies.get("uid") && 
                                        <Button onClick={()=> {}} variant="secondary">Nhắn tin</Button>
                                    } */}
                                </div>
                                <ProfileInfo user={data} />
                                <br />
                                <div style={{width: "100%", display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 16}}>
                                    {/* {
                                        data?._id !== Cookies.get("uid") && 
                                        <Button onClick={()=> send_request_make_friend_by_me(data?._id, setDataSendRequest)} variant="primary">Kết bạn</Button>
                                    }
                                    
                                    <Button onClick={()=> props.setOpen(()=> false)} variant="secondary">Đóng</Button> */}
                                    {
                                        friendStatus?.request=== true && <Button onClick={async ()=> {
                                            await cancel_request_make_friend_from_me(data?._id, setChange);
                                            setFriendStatus(prev=> ({...prev, request: false}))
                                            setChange(prev=> !prev)
                                        }}>Hủy yêu cầu</Button>
                                    }
                                    {
                                        friendStatus?.request=== false && 
                                        data?._id !== Cookies.get("uid") && 
                                        <Button onClick={()=> {send_request_make_friend_by_me(data?._id, setDataSendRequest);setFriendStatus(prev=> ({...prev, request: true}))}} variant="primary">Kết bạn</Button>
                                    }
                                    <Button onClick={()=> props.setOpen(()=> false)} variant="secondary">Đóng</Button>
                                </div>
                                {
                                    dataSendRequest?.request=== false && dataSendRequest?.duplicate=== false && <div style={{fontSi: 14}}>{"Có lỗi xảy ra, vui lòng thử lại sau"}</div>
                                }

                            </>
                        }
                        {
                            data?.exist=== false && <>
                                <div style={{textAlign: "center"}}>Không tìm thấy người có số điện thoại này</div>
                            </>
                        }
                        {
                            data?.exist=== -1 && <>
                                <div className={"jdjadkjgkddssa"} style={{width: '100%', height: 68, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column"}}>
                                    <div style={{marginBottom: 8, width: "100%"}}>Tìm bằng số điện thoại</div>
                                    <input value={phoneNumber} onChange={e=> setPhoneNumber(e.target.value)} type="text" style={{width: "100%", height: 40, padding: 10, background: "#d9d9d9", borderRadius: 5, outlineColor: "#2e89ff"}} placeholder={"Số điện thoại"} />
                                </div>
                                <br />
                                <div style={{width: "100%", display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 16}}>
                                    <Button onClick={()=> {
                                        if(phoneNumber?.trim()?.length <= 0 || !phoneNumber) {
                                            return swal("Thông báo", "Không được để trống số điện thoại", "error")
                                        }
                                        search_user_by_phone(phoneNumber?.trim(), setData)
                                    }} variant="primary">Xác nhận</Button>
                                    <Button onClick={()=> props.setOpen(()=> false)} variant="secondary">Hủy</Button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}

const PopupMakeConversation= (props)=> {
    // eslint-disable-next-line
    const [result, setResult]= useState()
    const [img, setImage]= useState()
    const {data}= useContext(AppContext)
    const [label, setLabel]= useState(()=> "")
    const imgChoose= img ? true : false
    const navigate= useNavigate()
    const [arrayMember, setArrayMember]= useState(()=> [])
    useEffect(()=> {
        if(data) {
            setArrayMember(prev=> ([...prev, data?._id]))
        }
    }, [data])
    const setImgFunction= (e)=> {
        setImage({img: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]), key: e.target.files[0].lastModified})
    }
    const exec= async ()=> {
        if(arrayMember.length <= 1) {
            return swal("Thông báo", "Số lượng thành viên nhóm phải nhiều hơn một người", "error")
        }
        if(label.length <= 0) {
            return swal("Thông báo", "Không được để thiếu tên nhóm", "error")

        }
        if(img?.img) {
            const urlImage= await uploadImageClient(img.img)
            await make_conversation(label, arrayMember, data?._id, urlImage, setResult, navigate)
            .then(()=> swal("Thông báo", "Tạo nhóm thành công", "success"))
            props.setOpen(()=> false)
            props?.setChange(()=> prev=> !prev)
        }
        else {
            await make_conversation(label, arrayMember, data?._id, IMAGE_GROUP_DEFAULT, setResult, navigate)
            .then(()=> swal("Thông báo", "Tạo nhóm thành công", "success"))
            props.setOpen(()=> false)
            props?.setChange(()=> prev=> !prev)
        }
    }
    return (
        <div className={"fkjldsklkdsslaskdsaa"} style={{width: "100%", height: "100%", position: "fixed", top: 0, left: 0, background: "rgba(0 ,0 ,0,0.3)", zIndex: 12, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <OutsideClickHandler onOutsideClick={()=> props.setOpen((()=> false))}>
                <div className={"fjlkdsjdkljsdklaskd"} style={{padding: 16, background: "#fff", borderRadius: 5, width: "100vw", maxWidth: 450}}>
                    <div style={{width: "100%", height: "100%"}}>   
                        <div className={"jdjadkjgkddssa"} style={{width: '100%', height: 68, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <strong>Tạo một cuộc trò chuyện</strong>
                            <div style={{display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer"}} onClick={()=> props.setOpen(()=> false)}>
                                <GrClose />
                            </div>
                        </div>
                        <div className={"fksldjkghjkdskdas"} style={{width: "100%", display: "flex", alignItems: "center",gap: 8}}>
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", width: 48, height: 48, position: "relative", border: "1px solid #e7e7e7", borderRadius: "50%"}}>
                                {
                                    imgChoose=== true ? <img src={img?.preview} alt={"open"} style={{width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%"}} /> : <AiFillCamera />
                                }
                                <input type={"file"} onChange={setImgFunction} style={{width: "100%", height:" 100%", top:0, left: 0, position: "absolute", zIndex: 12, cursor: "pointer", opacity: 0}} title={"Chọn ảnh đại diện của nhóm"} />
                            </div>
                            <div className={"fsjfkjdkfkeakljes"} style={{flex: " 1 1 0"}}>
                                <input value={label} onChange={e=> setLabel(e.target.value)} className={"gjlkdjslkfjdkaslas"} type="text" style={{width: "100%", height: 48, outlineColor: "#2e89ff"}} placeholder={"Nhập tên nhóm"} />
                            </div>  
                        </div>
                        <br />
                        <div style={{width: "100%"}}>
                            <div style={{marginBottom: 12}}>Thêm bạn vào nhóm</div>
                            <div style={{width: "100%", position: "relative"}}>
                                <input className={"fjskldjfdkdjskldas fijldkjlsfjhkldjksldas"} placeholder={"Nhập tên, số điện thoại cần tìm"} type="text" style={{width: "100%", padding: "10px 36px", height: 48, borderRadius: 80}} />
                                <AiOutlineSearch style={{width: 24, height: 24, position: "absolute", top: "50%", left: 0, transform: "translate(50%, -50%)"}} />
                            </div>
                        </div>  
                        {/*  */}
                        <ListFriendItem is_invite={true} setArrayMember={setArrayMember} arrayMember={arrayMember} />
                        {/*  */}
                        <br />
                        <div style={{width: '100%', display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 10}}>
                            <Button onClick={exec} variant={"primary"}>Tạo nhóm</Button>
                            <Button onClick={()=> props?.setOpen(()=> true)} variant={"secondary"}>Hủy</Button>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default memo(SearchAndList)