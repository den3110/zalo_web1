import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { InputAdornment, TextField } from "@mui/material";
import update_password from "../../api/update_password";
import { useSnackbar } from "notistack";
import {BiShow, BiHide } from "react-icons/bi"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdatePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword1, setShowPassword1]= React.useState(false)
  const [showPassword2, setShowPassword2]= React.useState(false)
  const [showPassword3, setShowPassword3]= React.useState(false)

  return (
    <div style={{padding: 10}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Đổi mật khẩu
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Đổi mật khẩu"}</DialogTitle>
        <DialogContent>
          <TextField
            type={showPassword1 ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            label={"Nhập mật khẩu cũ"}
            style={{ width: 500, marginTop: 12}}
            InputProps={{
              endAdornment: <InputAdornment style={{cursor: "pointer"}} position="end">
                {
                  showPassword1=== false ? <BiShow onClick={()=> setShowPassword1(()=> true)} /> : <BiHide onClick={()=> setShowPassword1(()=> false)} />
                }
              </InputAdornment>,
            }}
          />
          <div></div>
          <br />
          <div></div>
          <TextField
            type={showPassword2 ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label={"Nhập mật khẩu mới"}
            style={{ width: 500, marginTop: 12}}
            InputProps={{
              endAdornment: <InputAdornment style={{cursor: "pointer"}} position="end">
                {
                  showPassword2=== false ? <BiShow onClick={()=> setShowPassword2(()=> true)} /> : <BiHide onClick={()=> setShowPassword2(()=> false)} />
                }
              </InputAdornment>,
            }}
          />
          <div></div>
          <br />
          <div></div>
          <TextField
            type={showPassword3 ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label={"Nhập lại mật khẩu mới"}
            style={{ width: 500, marginTop: 12}}
            InputProps={{
              endAdornment: <InputAdornment style={{cursor: "pointer"}} position="end">
                {
                  showPassword3=== false ? <BiShow onClick={()=> setShowPassword3(()=> true)} /> : <BiHide onClick={()=> setShowPassword3(()=> false)} />
                }
              </InputAdornment>,
            }}
          />
          <div></div>
          <br />
          <div></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button
            onClick={async () => {
              if(newPassword.trim() !== confirmPassword.trim()) {
                enqueueSnackbar("Mật khẩu mới không khớp, vui lòng thử lại", {
                  variant: "error",
                });
                return
              }
              try {
                const result = await update_password(oldPassword, newPassword);
                enqueueSnackbar(result?.message, {
                  variant: "success",
                });
                handleClose();
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                // enqueueSnackbar(result?.message, {
                //   variant: "success",
                // });
              } catch (error) {
                enqueueSnackbar(error?.response?.data?.message || "", {
                  variant: "error",
                });
              }
            }}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
