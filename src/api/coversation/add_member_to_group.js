import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const add_member_to_group = async (conversationId, newMember, setData) => {
    const res= await axios({
        url: SERVER_URL+ "/api/conversations/add-member-group/"+ conversationId,
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        data: {
            member: newMember
        }
    })
    const result= await res.data
    return setData(result)
}

export default add_member_to_group