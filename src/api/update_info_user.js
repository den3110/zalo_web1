import axios from "axios";
import { SERVER_URL } from "../config/config";
import { uploadImageClient } from "../firebase/config";
import Cookies from "js-cookie";
// import validUrl from "valid-url";

const update_info_user = async (
  id,
  newUsername,
  newProfilePicture,
  newGender,
  setMessage,
  setData,
  changeAvatar,
  newCoverPhoto,
  changeCoverPhoto,
  newAddress
) => {

  let finalAvatar= newProfilePicture
  let finalCover= newCoverPhoto;
  if(changeAvatar=== true) {
    const urlAvatar = await uploadImageClient(newProfilePicture);
    finalAvatar= urlAvatar
  }
  if(changeCoverPhoto=== true ){
    const urlCover = await uploadImageClient(newCoverPhoto);
    finalCover= urlCover

  }
  const res = await axios({
    url: `${SERVER_URL}/api/users/edit-infor/${id}`,
    method: "post",
    headers: {
      authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
    data: {
      newUsername: newUsername,
      newProfilePicture: finalAvatar,
      newGender,
      newCoverPhoto: finalCover,
      newAddress
    },
  });
  const result = await res.data;
  setData(result?.user);
  setMessage(result);
  return result
};

export default update_info_user;
