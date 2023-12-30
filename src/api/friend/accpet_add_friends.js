import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const accpet_add_friends = async (id, setData) => {
    const res =await axios({
        url: SERVER_URL+ "/api/users/accept-add-friend/"+ id,
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
    return setData("Các bạn hiện đã trở thành bạn bè của nhau")
}

export default accpet_add_friends
