import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const get_list_conversation=async (setData)=> {
    const res=await axios({
        url: `${SERVER_URL}/api/conversations/${Cookies.get("uid")}`,
        method: "get",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return setData(result)
}

export default get_list_conversation