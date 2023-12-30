export default function validateConfirmPassword(password, confirmPassword) {
    
    // Sử dụng method test để kiểm tra mật khẩu
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }