import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const get_list_user_send_request_add_friend_of_me= async (setData)=> {
    const res= await axios({
        url: `${SERVER_URL}/api/users/get-list-user-send-request-add-friend-of-me/${Cookies.get("uid")}`,
        method: "get",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return setData(result)
}

export default get_list_user_send_request_add_friend_of_me