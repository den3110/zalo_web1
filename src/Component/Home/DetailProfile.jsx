import React, { memo } from 'react'
// import OutsideClickHandler from 'react-outside-click-handler'
import {GrClose } from "react-icons/gr"
import CoverPhoto from './CoverPhoto'
import Avatar from './Avatar'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useState } from 'react'
import { useEffect } from 'react'
import update_info_user from '../../api/update_info_user'
import Cookies from 'js-cookie'
import { Button } from 'react-bootstrap'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import deaf_user from '../../api/user/deaf_user'
import { useSnackbar } from 'notistack'
import { SocketContainerContext } from '../../SocketContainer/SocketContainer'
import UpdatePassword from './UpdatePassword'
import { Dialog, Slide } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
const DetailProfile = (props) => {
    const { enqueueSnackbar }= useSnackbar()
    const { socketState}= useContext(SocketContainerContext)
    const {data, setData, setChange }= useContext(AppContext)
    const [updateInfo, setUpdateInfo]= useState(false)
    const [newUsername, setNewUsername]= useState()
    const [changeAvatar, setChangeAvatar]= useState(false)
    const [newProfilePicture, setNewProfilePicture]= useState()
    const [newGender, setNewGender]= useState()
    const [updateData, setUpdateData]= useState()
    const [newAddress, setNewAddress]= useState()
    const [changeCoverPhoto, setChangeCoverPhoto]= useState(false)
    // eslint-disable-next-line
    const [newDateOfBirth, setNewDateOfBirth]= useState("")
    const [newCoverPhoto, setNewCoverPhoto]= useState()

    useEffect(()=> {
        setNewGender(()=> data?.gender?.toString())
        setNewUsername(()=> data?.username)
        setNewProfilePicture(()=> data?.profilePicture)
        setNewDateOfBirth(()=> data?.dateOfBirth)
        setNewAddress(()=> data?.address)
        setNewCoverPhoto(()=> data?.coverPicture)
    }, [data?.gender, data?.username, data?.profilePicture, data?.dateOfBirth, data?.address, data?.coverPicture])
    useEffect(()=> {
        if(parseInt(updateData?.status)=== 200) {
            enqueueSnackbar(updateData?.msg, {
                variant: "success"
            })
        }
        else if(parseInt(updateData?.status)=== 500) {
            enqueueSnackbar(updateData?.msg, {
                variant: "error"
            })
        }
    }, [updateData, enqueueSnackbar])
    
  return (

    <Dialog
        open={props?.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props?.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >

                    {/*  */}
                    {
                        updateInfo=== false && 
                        <div className={"DSkkjfkdjskljfdas"} style={{maxWidth: 450, width: "100vw", background: "#fff", padding: 10, borderRadius: 10}}>
                            <div className={"jdjadkjgkddssa"} style={{width: '100%', height: 68, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <strong>Thông tin tài khoản</strong>
                                <div style={{display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer"}} onClick={()=> props.handleClose()}>
                                    <GrClose />
                                </div>
                            </div>
                            <CoverPhoto coverPhoto={data?.coverPicture} />
                            <Avatar setChangeAvatar={setChangeAvatar} setOpen={()=> {}} avatar={newProfilePicture} />
                            <NameProfile username={data?.username} />
                            <ProfileInfo user={data} />
                            <AdvancedSettings user={data} />
                            <br />
                            <div className={"fjldjskdjkslajkalsas"} style={{width: '100%', display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <Button variant={"primary"} onClick={()=> setUpdateInfo(()=> true)} className={"fjlkdjfklsdjdasas"} style={{display: 'flex', justifyContent:"center", alignItems: "center", background: "#2e89ff", cursor: "pointer", color: "#fff", fontWeight: 600, border: "none", outline: "none", borderRadius: 5, padding: "10px 30px", width :'100%'}}>
                                    Cập nhật thông tin 
                                </Button>
                                <br />
                            </div>
                        </div> 
                    }
                    {/*  */}
                    {
                        updateInfo=== true &&
                        <div className={"fjdklsjdksaassajksa"} style={{maxWidth: 450, width: "100vw", background: "#fff", padding: 10, borderRadius: 10}}>
                            <div className={"jdjadkjgkddssa"} style={{width: '100%', height: 68, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <strong>Cập nhật thông tin tài khoản</strong>
                                <div style={{display: "flex", justifyContent: 'center', alignItems: "center", cursor: "pointer"}} onClick={()=> props.handleClose()}>
                                    <GrClose />
                                </div>
                            </div>
                            <CoverPhoto setChangeCoverPhoto={setChangeCoverPhoto} newCoverPhoto={newCoverPhoto} setNewCoverPhoto={setNewCoverPhoto} is_edit={true} coverPhoto={data?.coverPicture} />
                            {/*  */}
                            <Avatar setChangeAvatar={setChangeAvatar} setOpen={()=> {}} avatar={newProfilePicture} newProfilePicture={newProfilePicture} setNewProfilePicture={setNewProfilePicture} is_edit={true} />
                        {/*  */}
                            <ChangeUserName newUsername={newUsername} setNewUsername={setNewUsername} username={data?.username} />
                        {/*  */}
                            <UpdateInfo newGender={newGender} setNewGender={setNewGender} newAddress={newAddress} setNewAddress={setNewAddress} />
                            <br />
                                <UpdatePassword />
                            <br />
                            <div className={"fjldjskdjkslajkalsas"} style={{width: '100%', display: "flex", justifyContent: "center", alignItems: "center", gap :20}}>
                                {
                                    updateData?.msg ? <>
                                        <button onClick={()=> {props.handleClose(); setUpdateInfo(()=> true)}} className={"fjlkdjfklsdjdasas"} style={{display: 'flex', justifyContent:"center", alignItems: "center", background: "#5555", cursor: "pointer", color: "#000", fontWeight: 600, border: "none", outline: "none", borderRadius: 5, padding: "10px 30px"}}>
                                            Đóng
                                        </button>

                                    </>
                                    : 
                                    <>
                                        <button onClick={()=> setUpdateInfo(()=> false)} className={"fjlkdjfklsdjdasas"} style={{display: 'flex', justifyContent:"center", alignItems: "center", background: "#5555", cursor: "pointer", color: "#000", fontWeight: 600, border: "none", outline: "none", borderRadius: 5, padding: "10px 30px"}}>
                                            Hủy
                                        </button>
                                        <button onClick={async ()=> {
                                            const result= await update_info_user(Cookies.get("uid"), newUsername, newProfilePicture, newGender, setUpdateData, setData, changeAvatar, newCoverPhoto, changeCoverPhoto, newAddress)
                                            if(result?.status=== 200) {
                                                socketState?.emit("update_profile_user", {meId: Cookies.get("uid")})
                                            }
                                        }} className={"fjlkdjfklsdjdasas"} style={{display: 'flex', justifyContent:"center", alignItems: "center", background: "#2e89ff", cursor: "pointer", color: "#fff", fontWeight: 600, border: "none", outline: "none", borderRadius: 5, padding: "10px 30px"}}>
                                            Cập nhật
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    }
      </Dialog>
  )
}

const AdvancedSettings= (props)=> {
    const [check, setCheck]= useState(false)
    const {setChange }= useContext(AppContext)
    useEffect(()=> {
        setCheck(props?.user?.isDeaf || false)
    }, [props?.user?.isDeaf])
    return (
        <div style={{width: "100%", padding: 10}}>
            <div style={{fontSize: 16, fontWeight: 600,marginBottom: 12 }}>Nâng cao</div>
            <div style={{display: "flex", alignItems: 'center'}}>
            <Toggle
                id='cheese-status'
                checked={check}
                onChange={()=> {
                    setChange(prev=> !prev)
                    setCheck(prev=> !prev)
                    deaf_user(!check)
                }}     
            />
            <label style={{marginLeft: 8}} htmlFor='cheese-status'>Chế độ giành cho người bệnh</label>
            </div>  
        </div>
    )
}

export const NameProfile= (props)=> {
    return (
        <div className={"dshjjdkfhjdksldjksdas"} style={{width: "100%",display: "flex",justifyContent: "center", alignItems: "center", padding: 10}}>
            <div className={"dkldjskldjkasdasa"} style={{fontWeight: 600, fontSize: 18}}>
                {props.username}
            </div>
        </div>
    )
}

export const ProfileInfo= (props)=> {
    return (
        <div className={"fdlkdjsklfjdklddaas" } style={{width: '100%', padding: 10}}>
            <div style={{fontWeight: 600, marginBottom: 16}}>Thông tin cá nhân</div>
            <ItemProfileInfo title={"Điện thoại:"} info={props?.user?.phoneNumber} />
            <ItemProfileInfo title={"Giới tính:"} info={props?.user?.gender=== true? "Nam" : "Nữ"} />
            <ItemProfileInfo title={"Địa chỉ:"} info={props?.user?.address} />
        </div>
    )
}

const ItemProfileInfo= (props)=> {
    return (
        <div className={"fjkdajsfkldjklasas"} style={{width: '100%', display: "flex", alignItems: "center", marginBottom: 12}}>
            <div className={"gjfdajskldjfskdlj"} style={{width: 100}}>
                {props.title}
            </div>
            <div className={"cvlkdjsfksjkdljdasdas"} style={{fontSize: 16}}>
                {props.info}
            </div>
        </div>
    )
}

// update

const ChangeUserName= (props)=> {
    return (
        <div className={"djklsDjkldjksldaas"} style={{justifyContent: "center", alignItems: "center", width: "100%", margin: "12px 0", padding: "0 10px", }}>
            <div className={"dflksdjkfsjsdsas"} style={{marginBottom: 8,}}>Tên hiển thị</div>
            <input onChange={(e)=> props.setNewUsername(e.target.value)} value={props.newUsername} type="text" style={{width: "100%", height: 40, padding: 10, border: "1px solid #e7e7e7", borderRadius: 5, outlineColor: "#2e89ff"}} />
            <div className={"dklsjdklajkasdsas"} style={{fontSize: 14, marginTop: 4}}>Sử dụng tên thật để bạn bè dễ dàng nhận biết hơn</div>
        </div>
    )
}

const UpdateInfo= (props)=> {
    return (
        <div className={"kladksmdlsaskdsaskld"} style={{marginTop: 40, padding: 10}}>
            <div className={"kladkfksldsadskljd"} style={{fontWeight: 600, marginBottom: 12}}>
                Thông tin cá nhân 
            </div>
            <UpdateGender {...props} />
            <br />
            <UpdateAddress {...props} />
        </div>
    )
}

const UpdateGender= (props)=> {
    return (
        <div className={"msafkdmsalksjkldjs"} style={{}}>
            <div className={"lksadjklasjklasjas"} style={{marginBottom: 8}}>Giới tính</div>
            <div className={"fklsaskdsmlaksajksa"} style={{display: "flex", alignItems: 'center', gap: 20}}>
                <div className={"lksjaklssaasas"} style={{display: "flex", alignItems: 'center', gap: 5}}>
                    <input checked={props.newGender=== "true" ? true : false} onChange={(e)=> props.setNewGender(e.target.value)} type="radio" name={"gender"} value={true} style={{width: 20, height: 20}} />
                    <div className={"lkdasdkaSasad"}>Nam</div>
                </div>
                {/*  */}
                <div className={"lksjaklssaasas"} style={{display: "flex", alignItems: 'center', gap: 5}}>
                    <input checked={props.newGender=== "false" ? true : false} onChange={(e)=> props.setNewGender(e.target.value)} type="radio" name={"gender"} value={false} style={{width: 20, height: 20}} />
                    <div className={"lkdasdkaSasad"}>Nữ</div>
                </div>
            </div>
        </div>
    )
}

const UpdateAddress= (props)=> {
    return (
        <div className={"msafkdmsalksjkldjs"} style={{}}>
            <div className={"lksadjklasjklasjas"} style={{marginBottom: 8}}>Địa chỉ</div>
            <div className={"fklsaskdsmlaksajksa"} style={{display: "flex", alignItems: 'center', gap: 20}}>
                <input value={props?.newAddress} onChange={(e)=> props?.setNewAddress(e.target.value)} type="text" style={{width: "100%", height: 40, padding: 10, borderRadius: 5, outlineColor: "#2e89ff"}} />
            </div>
        </div>
    )
}

const UpdateDateOfBirth= (props)=> {
    return (
        <div className={"msafkdmsalksjkldjs"} style={{}}>
            <div className={"lksadjklasjklasjas"} style={{marginBottom: 8}}>Ngày sinh</div>
            <div className={"fklsaskdsmlaksajksa"} style={{display: "flex", alignItems: 'center', gap: 20}}>
                <input value={props?.newDateOfBirth} onChange={(e)=> props?.setNewDateOfBirth(e.target.value)} type="text" style={{width: "100%", height: 40, padding: 10, borderRadius: 5, outlineColor: "#2e89ff"}} />
            </div>
        </div>
    )
}

export default memo(DetailProfile)
