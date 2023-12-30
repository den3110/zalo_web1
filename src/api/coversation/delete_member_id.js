import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const delete_member_id = async (memberId, conversationId,setData) => {
    const res= await axios({
        url: SERVER_URL+ "/api/conversations/delete-member/"+ memberId,
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        data: {
            userId: Cookies.get("uid"),
            conversationId
        }
    })
    const result= await res.data
    console.log(result)
    return setData(prev=> !prev)
}

export default delete_member_id
