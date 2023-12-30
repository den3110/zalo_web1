import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../../config/config"

const get_detail_image = async (key) => {
    const res= await axios({
        url: SERVER_URL+ "/api/messages/media/image",
        method: "get",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        params: {
            key
        }
    })

    const result= await res.data
    return result
}

export default get_detail_image
