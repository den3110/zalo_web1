import React, { useState } from "react";
import { AiTwotoneLock } from "react-icons/ai";
import { BsPhoneFill } from "react-icons/bs";
import { BiShowAlt, BiHide } from "react-icons/bi"
// import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import styles from "../Signup/Signup.module.sass";
import login from "../../api/login";
import { useSnackbar } from "notistack";

const Login = (props) => {
  const navigate = useNavigate();
  
 
  const [showPassword, setShowPassword]= useState(false)
  const [phoneNumber, setPhoneNumber] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  // const [data, setData] = useState();
  const {enqueueSnackbar }= useSnackbar()

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        {
          <>
            <div className={styles.register_title} style={{ marginBottom: 20, fontSize: 18 }}>
              Đăng nhập tài khoản tin nhắn nhanh <br></br>để kết nối với ứng dụng tin nhắn nhanh
              Zalo web
            </div>
            <div className={styles["formxx"]} action="#">
              <div className={styles.register_form_input}>
                <input
                  type="text"
                  placeholder="Số điện thoại hoặc email"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoComplete={"off"}
                ></input>
                <span>
                  <BsPhoneFill />
                </span>
              </div>
              <div style={{position: "relative"}} className={styles.register_form_input}>
                <input
                  type={showPassword=== true ? "text" : "password"}
                  placeholder="Mật khẩu"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={"off"}
                ></input>
                <span>
                  {" "}
                  <AiTwotoneLock />
                </span>
                <span style={{position: "absolute", left: "100%", top: "50%", transform: "translate(-100%, -50%)"}}>
                  {
                    showPassword=== false && <BiHide onClick={()=> setShowPassword(true)} />
                  }
                  {
                    showPassword=== true && 
                    <BiShowAlt onClick={()=> setShowPassword(false)} />
                  }

                </span>
              </div>
              <button
                onClick={async () => {
                  const result= await login(phoneNumber, password)
                  if(parseInt(result?.status) === 400 || parseInt(result?.status)=== 500) {
                    enqueueSnackbar (result?.msg, {
                      variant: "error"
                    })
                  }
                }}
                className={styles.btn} style={{fontSize: 16}}
              >
                Đăng nhập
              </button>
              <div onClick={()=> navigate("/forgot-password")} style={{ width: "100%", textAlign: "right", fontSize: 14, cursor: "pointer"}}>Quên mật khẩu</div>
              {/* {
                <div style={{fontSize: 14, width: "100%", textAlign: "left", color: "#f00 "}}>{data?.msg}</div>
              } */}
              <div className={styles.toLogin}>
                <Link style={{fontSize: 16}} to="/signup">Đăng ký</Link>
              </div>
            </div>
          </>
        }
      </div>
      <Background />
    </div>
  );
};

export default Login;
