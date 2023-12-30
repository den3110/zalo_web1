import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const get_info_detail_conversation = async (idConversation, setData) => {
  const res= await axios({
    url: SERVER_URL+ "/api/conversations/detail/"+ idConversation,
    method: "get",
    headers: {
        "authorization": "Bearer "+ Cookies.get("accessToken")
    }
  })
  const result= await res.data
  return setData(result)
}

export default get_info_detail_conversation
