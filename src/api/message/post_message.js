import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const post_message= async (sender, conversation, key, message, roomId, type_message, name_file, extend_text)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/messages",
        method: "post",
        data: {
            sender, conversation, key, message, roomId, type_message, name_file, extend_text
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return (result)

}

export default post_message