import React, { useState } from "react";
import { BsPhoneFill, BsCode } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Background from "../Background/Background";
import styles from "../Signup/Signup.module.sass";
import { Button } from "react-bootstrap";
import forgot_password from "../../api/forgot_password";
import "./style.sass";
import confirm_code from "../../api/confirm_code";
import { AiTwotoneLock } from "react-icons/ai";
import reset_password from "../../api/reset_password";
import swal from "sweetalert";
import { useSnackbar } from "notistack";
import validatePassword from "../../util/validatePassword";
import { memo } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";

const ForgotPassword = (props) => {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const {enqueueSnackbar }= useSnackbar()

  const [result, setResult] = useState();
  const [confirmCode, setConfirmCode] = useState();

  const [phoneNumber, setPhoneNumber] = useState(() => "");
  const [status, setStatus] = useState();
  const [password, setPassword] = useState();
  // eslint-disable-next-line
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword]= useState(false)
  const [showConfirmPassword, setShowConfirmPassword]= useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.register}>
        {
          <>
            <div
              className={styles.register_title}
              style={{ marginBottom: 20, fontSize: 24 }}
            >
              Quên mật khẩu <br></br>
            </div>
            <div className={styles.formxx} action="#">
              {!result && (
                <>
                  <div className={styles.register_form_input}>
                    <input
                      type="email"
                      placeholder="Nhập email của bạn để khôi phục mật khẩu"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoComplete={"off"}
                    ></input>
                    <span>
                      <BsPhoneFill />
                    </span>
                  </div>
                  <div className={"fjkadjksjksjdasaa"}>
                    <Button
                      onClick={() => {
                        if(phoneNumber?.trim()?.length <= 0) {
                          return swal("Thông báo", "Bạn phải điền email để tiếp tục", "error")
                        }
                        forgot_password(phoneNumber, setResult)
                      }}
                    >
                      Gửi
                    </Button>
                  </div>
                </>
              )}
              {result && (
                <div className={"gjldajfskdjsjsa"}>
                  <div className={"jksdjklsdjkasasas"} style={{ fontSize: 12 }}>
                    {result?.message}
                  </div>
                  <div className={styles.register_form_input}>
                    <input
                      type="text"
                      placeholder="Nhập mã xác thực để khôi phục mật khẩu"
                      onChange={(e) => setConfirmCode(e.target.value)}
                      autoComplete={"off"}
                    ></input>
                    <span>
                      <BsCode />
                    </span>
                  </div>
                  <div
                    className={`${styles.register_form_input} fjkadjksjksjdasaa`}
                  >
                    <Button
                      onClick={() =>
                        confirm_code(phoneNumber, confirmCode, setStatus)
                      }
                      color={"primary"}
                    >
                      Gửi
                    </Button>
                  </div>
                  {status?.verify === true && (
                    <>
                      <div style={{fontSize: 12, textAlign: "left"}}>Mật khẩu phải có ít nhất 8 ký tự gồm có 1 chữ số, 1 chữ viết hoa, 1 chữ viết thường và 1 ký tự đặc biệt</div>
                      <div className={styles.register_form_input}>
                        <input
                          type={showPassword=== false ? "password" : "text"}
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
                          type={showConfirmPassword=== false ? "password" : "text"}
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
                          showConfirmPassword=== false && <BiHide onClick={()=> setShowConfirmPassword(true)} />
                        }
                        {
                          showConfirmPassword=== true && 
                          <BiShowAlt onClick={()=> setShowConfirmPassword(false)} />
                        }

                </span>
                      </div>
                      <div className={"fjkadjksjksjdasaa"}>
                        <Button
                          onClick={async () =>
                            {
                              if(password?.trim()?.length <= 0) {
                                enqueueSnackbar("Không được để trống mật khẩu", {
                                  variant: "error"
                                })
                              }
                              else if(password !== confirmPassword) {
                                  enqueueSnackbar("Xác thực mật khẩu không khớp", {
                                    variant: "error"
                                  })
                                  return
                              }
                              else if(validatePassword(password?.trim())=== false) {
                                  enqueueSnackbar("Mật khẩu quá yếu, mật khẩu phải có ít nhất 8 kí tự, ít nhất một chữ thường, một chữ hoa và một chữ số", {
                                    variant: "error"
                                  })
                                  return 
                              }
                              await reset_password(phoneNumber, password, navigate)
                              swal("Thông báo", "Bạn đã cập nhật mật khẩu thành công", "success")
                              .then(()=> navigate("/login"))
                            }

                          }
                          className={"fjkadjksjksjdasaa"}
                          color={"primary"}
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </>
                  )}
                  <WrongCode status={status} />
                </div>
              )}
            </div>
          </>
        }
      </div>
      <Background />
    </div>
  );
};

export const WrongCode= memo(({status})=> {
  const {enqueueSnackbar }= useSnackbar()

  return (
    <div style={{display: "none"}}>
      {status?.verify === false && enqueueSnackbar("Mã xác thực không chính xác", {
        variant: "error"
      })}
    </div>
  )
})

export default ForgotPassword;
