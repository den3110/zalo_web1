import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const recall_message = async(keyId, message) => {
    const res= await axios({
        url: SERVER_URL+ "/api/messages/recall/message/"+ keyId,
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

export default recall_message
