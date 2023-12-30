import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const send_voice= async (data)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/conversations/upload/voice",
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken"),
            "Content-Type": "multipart/form-data"
        },
        data: data
    })
    const result= await res.data
    return result
}

export default send_voice