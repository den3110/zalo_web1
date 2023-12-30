import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const get_friend_status= async (idUser)=> {
    const res= await axios({
        url: `${SERVER_URL}/api/users/request/status/`+ idUser,
        method: "get",
        params: {
            userId: Cookies.get("uid")
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default get_friend_status