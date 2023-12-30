import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const cancel_request_make_friend_from_me = async (id, setChange) => {
    const res= await axios({
        url: `${SERVER_URL}/api/users/cancel-add-friend/${id}`,
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        data: {
            userId: Cookies.get("uid")
        }
    })
    const result= await res.data
    return setChange(prev=> !prev)
}

export default cancel_request_make_friend_from_me
