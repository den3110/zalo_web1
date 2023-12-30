import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import get_detail_image from '../../api/message/get_detail_image'
import Blur from "react-blur"

const Image = () => {
  const [data, setData]= useState()
  const {image_id }= useParams()
  useEffect(()=> {
    (async()=> {
        const result= await get_detail_image(image_id)
        return setData(result)
    })()
  }, [image_id])
  return (
    <div style={{position: "fixed", width: "100%", height: "100%",top :0 ,left: 0}}>
      {
        data?.message && 
        <Blur className={"blur-image-1"} shouldResize={true} enableStyles={true} img={data?.message} blurRadius={50}>
          <img style={{height: "90%", objectFit: "contain", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", aspectRatio: 16 / 9}} src={data?.message} alt="" />
        </Blur>
      }
    </div>
  )
}

export default Image