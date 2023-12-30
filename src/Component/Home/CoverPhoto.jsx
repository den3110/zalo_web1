import React from 'react'
import { useState } from 'react'
import {AiFillCamera } from "react-icons/ai"

const CoverPhoto = (props) => {
  const [imgPreview, setImagePreview]= useState()
  const check= imgPreview ? true :  false
  const imgPreviewFunction= (e)=> {
    setImagePreview({img: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]), key: e.target.files[0].lastModified})
    props?.setNewCoverPhoto(e.target.files[0])
    if(props?.setChangeCoverPhoto) {
      props?.setChangeCoverPhoto(true)
    }
    // if(props?.setNewCoverPhoto) {
    //   // props?.setChangeAvatar(()=> true)
    // }
  }
  return (
    <div className={"fjlkdajsklfjdskass"} style={{width :'100%', position: "relative",height: 120}}>
        {
          check=== true ? <div className={'jfdjfkdjdsklfdjdaklsa'}style={{width: "100%", height: 150, backgroundImage: `url(${imgPreview?.preview})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", position: "absolute", top: 0, left: 0}}>
            
            {
              props?.is_edit=== true && <div className={"fkdlksdklsdcvx"} style={{display: "flex", justifyContent: "center", alignItems: 'center', position: "absolute", right: 0, bottom: 0, zIndex: 13, cursor: "pointer",}}>
                  <AiFillCamera size={30} style={{padding: 5, backgroundColor: "#fff", borderRadius: "50%"}} />
                  <input onChange={imgPreviewFunction} type={"file"} title={"Chọn ảnh bìa của bạn"} style={{width: "100%", height: "100%", position: "absolute", opacity: 0, zIndex: 14, cursor: "pointer"}} />
                </div>
            }
            </div> : <div className={'jfdjfkdjdsklfdjdaklsa'}style={{width: "100%", height: 150, backgroundImage: `url(${props?.coverPhoto?.length > 0 ? props?.coverPhoto : "https://cover-talk.zadn.vn/default"})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", position: "absolute", top: 0, left: 0}}>
            
            {
              props?.is_edit=== true && <div className={"fkdlksdklsdcvx"} style={{display: "flex", justifyContent: "center", alignItems: 'center', position: "absolute", right: 0, bottom: 0, zIndex: 13, cursor: "pointer",}}>
                  <AiFillCamera size={30} style={{padding: 5, backgroundColor: "#fff", borderRadius: "50%"}} />
                  <input onChange={imgPreviewFunction} type={"file"} title={"Chọn ảnh đại bìa của bạn"} style={{width: "100%", height: "100%", position: "absolute", opacity: 0, zIndex: 14, cursor: "pointer"}} />
                </div>
            }
            </div>
        }
    </div>
  )
}

export default CoverPhoto