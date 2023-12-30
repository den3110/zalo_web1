import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const get_message_conversationid = async (conversationId, setData, query) => {
    const res= await axios({
        url: SERVER_URL+ "/api/messages/"+ conversationId,
        method: "get",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        params: {
            ...query
        }
    })

    const result= await res.data
    return setData(result.data)
}

export default get_message_conversationid
