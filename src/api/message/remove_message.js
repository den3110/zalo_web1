import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const remove_message = async(keyId, message) => {
    const res= await axios({
        url: SERVER_URL+ "/api/messages/remove/message/"+ keyId,
        method: "post", 
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        data: {
            message
        }
    })
    const result= await res.data
    return result
}

export default remove_message
