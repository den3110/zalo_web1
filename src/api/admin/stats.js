import axios from "axios"
import { SERVER_URL } from "../../config/config"

const stats= async ()=> {
    const res= await axios({
        url: SERVER_URL+ "/api/admin/stats",
        method: "get",
    })
    const result= await res.data
    return result
}

export default stats