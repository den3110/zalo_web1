import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const get_conversation_friends = async (friendId, setData) => {
    const res= await axios({
        url: SERVER_URL+ "/api/conversations/friend/"+ friendId,
        method: "post",
        data: {
            userId: Cookies.get("uid")
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return setData(result)
}

export default get_conversation_friends
