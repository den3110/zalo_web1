import { useState } from "react";
import styles from "./Signup.module.sass";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUserAlt } from "react-icons/fa";
import { BsPhoneFill } from "react-icons/bs";
import { AiTwotoneLock, AiOutlineMail } from "react-icons/ai";

import * as yup from "yup";
import Background from "../Background/Background";
import signup from "../../api/signup";
import check_user from "../../api/check_user";
import forgot_password from "../../api/forgot_password";
import { Button } from "react-bootstrap";
import confirm_code from "../../api/confirm_code";
import { useEffect } from "react";
import { WrongCode } from "../ForgotPassword/ForgotPassword";
import { useSnackbar } from "notistack";
import validatePhoneNumber from "../../util/validatePhone";
import validateEmail from "../../util/validateEmail";
import validatePassword from "../../util/validatePassword";
import validateConfirmPassword from "../../util/validateConfirmPassword";
import { BiShowAlt, BiHide } from "react-icons/bi"
// eslint-disable-next-line

const Signup = () => {
  // eslint-disable-next-line
  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState(() => "");
  const [phoneNumber, setPhoneNumber] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [email, setEmail] = useState(() => "");
  // eslint-disable-next-line
  const [confirmPassword, setConfirmPassword] = useState(() => "");
  // eslint-disable-next-line
  const [data, setData] = useState();

  const [message, setMessage] = useState();
  const [checkFinal, setCheckFinal] = useState();
  const [codeVerify, setCodeVerify] = useState();
  const [status, setStatus] = useState();
  const [showPassword, setShowPassword]= useState(false)
  const [showConfirmPassowrd, setShowConfirmPassword]= useState(false)
  const checkUserandSignup = async () => {
    const check = await check_user(email, phoneNumber);
    if (check?.msg === true) {
      setMessage(true);
      forgot_password(email, setCheckFinal, true);
    } else {
      setMessage(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        {
          <>
            <div className={styles.register_title} style={{ marginBottom: 20, fontSize: 18 }}>
              Đăng ký tài khoản Zalo web <br></br>để kết nối với ứng dụng Zalo web
            </div>
            <div className={styles["formxx"]} action="#">
              {message === true && (
                <>
                  {checkFinal && (
                    <>
                      <div style={{ textAlign: "center", fontSize: 12 }}>
                        Chúng tôi đã gửi một mã xác thực gồm 6 chữ số đến email
                        của bạn. Vui lòng nhập vào đây để hoàn tất quá trình
                        đăng ký
                      </div>
                      <input
                        onChange={(e) => setCodeVerify(e.target.value)}
                        type="text"
                        placeholder="Nhập mã xác thực"
                      ></input>
                      <br />
                      <Button
                        color={"primary"}
                        onClick={() =>
                          confirm_code(email, codeVerify, setStatus)
                        }
                      >
                        Xác nhận
                      </Button>
                      <WrongCode status={status} />
                      {status?.verify === true && (
                        <AutoSignup
                          username={username}
                          phoneNumber={phoneNumber}
                          password={password}
                          email={email}
                          setData={setData}
                        />
                      )}
                    </>
                  )}
                </>
              )}
              {!message && (
                <>
                  <div className={styles.register_form_input}>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Họ và tên"
                    ></input>
                    <span>
                      {" "}
                      <FaUserAlt />
                    </span>
                  </div>
                  <div className={styles.register_form_input}>
                    <input
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      type="text"
                      placeholder="Số điện thoại"
                    ></input>
                    <span>
                      <BsPhoneFill />
                    </span>
                  </div>
                  <div className={styles.register_form_input}>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Email"
                    ></input>
                    <span>
                      <AiOutlineMail />
                    </span>
                  </div>
                  <div style={{fontSize: 12, textAlign: "left"}}>Mật khẩu phải có ít nhất 8 ký tự bao gồm ít nhất 1 chữ số, 1 chữ thường, 1 chữ viết hoa và 1 ký tự đặc biệt</div>
                  <div style={{position: "relative"}} className={styles.register_form_input}>
                    <input
                      type={showPassword=== true ? "text" : "password"}
                      placeholder="Mật khẩu"
                      required
                      onChange={(e) => setPassword(e.target.value)}
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
                  <div className={styles.register_form_input}>
                    <input
                      type={showConfirmPassowrd=== true ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                    <span>
                      {" "}
                      <AiTwotoneLock />
                    </span>
                    <span style={{position: "absolute", left: "100%", top: "50%", transform: "translate(-100%, -50%)"}}>
                  {
                    showConfirmPassowrd=== false && <BiHide onClick={()=> setShowConfirmPassword(true)} />
                  }
                  {
                    showConfirmPassowrd=== true && 
                    <BiShowAlt onClick={()=> setShowConfirmPassword(false)} />
                  }

                </span>
                  </div>
                  <div>
                    {message === false && (
                      <div style={{ color: "red", fontSize: 12 }}>
                        Số điện thoại hoặc gmail đã tồn tại vui lòng thử lại
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (username?.length <= 6) {
                        enqueueSnackbar("Họ tên ít nhất phải có 6 ký tự", {
                          variant: "error",
                        });
                      }
                      
                       else if (validatePhoneNumber(phoneNumber) === false) {
                          enqueueSnackbar(
                            "Số điện thoại không hợp lệ, phải có 10 chữ số",
                            {
                              variant: "error",
                            }
                          );
                      }
                      else if(validateEmail(email) === false ) {
                        enqueueSnackbar(
                            "Email không hợp lệ",
                            {
                              variant: "error",
                            }
                          );
                      }
                      else if(validatePassword(password) === false ) {
                        enqueueSnackbar(
                            "Mật khẩu phải có ít nhất 8 kí tự, ít nhất một chữ thường, một chữ hoa và một chữ số",
                            {
                              variant: "error",
                            }
                          );
                      }
                      else if(validateConfirmPassword(password, confirmPassword)=== false ) {
                        enqueueSnackbar(
                            "Mật khẩu không khớp",
                            {
                              variant: "error",
                            }
                          );
                      }
                      else {
                        checkUserandSignup();
                      }
                    }}
                    className={styles.btn}
                  >
                    Đăng ký
                  </button>
                </>
              )}

              <div className={styles.toLogin}>
                <Link style={{fontSize: 16}} to="/login">Đăng nhập</Link>
              </div>
            </div>
          </>
        }
      </div>
      <Background />
    </div>
  );
};

export default Signup;

const AutoSignup = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (props) {
      (async () => {
        await signup(
          props?.username,
          props?.phoneNumber,
          props?.password,
          props?.email,
          props?.setData
        );
        navigate("/login");
      })();
    }
  }, [navigate, props]);
  return <></>;
};
