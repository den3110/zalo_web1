import axios from "axios"
import Cookies from "js-cookie"
import { SERVER_URL } from "../config/config"

const search= async (keyword, setData)=> {
    const res= await axios({
        url: `${SERVER_URL}/api/conversations/search/${keyword}`,
        method: "post", 
        data: {
            userId: Cookies.get("uid")
        }
    })
    const result= await res.data
    return setData(result)
}

export default search