import axios from "axios"
import { SERVER_URL } from "../../config/config"
import Cookies from "js-cookie"

const text_to_voice= async (text)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/conversations/send/text-to-voice",
        method: "post",
        data: {
            text
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result?.voice
}

export default text_to_voice