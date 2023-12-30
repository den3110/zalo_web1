export default function validateEmail(email) {
    // Khai báo biến regex kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Sử dụng method test để kiểm tra email
    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  }
  