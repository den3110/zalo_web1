import axios from "axios";
import { SERVER_URL } from "../config/config";
import Cookies from "js-cookie";
// import validUrl from "valid-url";

const update_password = async (old_password, new_password) => {

  const res = await axios({
    url: `${SERVER_URL}/api/users/update-password/`,
    method: "post",
    headers: {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    data: {
      old_password,
      new_password
    },
  });
  const result = await res.data;
  return result
};

export default update_password;
