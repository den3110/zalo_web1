export default function validatePassword(password) {
    // Khai báo một biến regex kiểm tra mật khẩu
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    
    // Sử dụng method test để kiểm tra mật khẩu
    if (passwordRegex.test(password)) {
      return true;
    } else {
      return false;
    }
  }