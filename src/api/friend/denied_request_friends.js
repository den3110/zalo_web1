import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const denied_request_friends = async (id, setData) => {
    const res =await axios({
        url: SERVER_URL+ "/api/users/denied-add-friend/"+ id,
        method: "post",
        data: {
            userId: Cookies.get("uid")
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    console.log(result)
    return setData("Đã từ chối lời mời kết bạn")
}

export default denied_request_friends
