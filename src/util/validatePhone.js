export default function validatePhoneNumber(phoneNumber) {
    // Khai báo biến regex kiểm tra số điện thoại
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    
    // Sử dụng method test để kiểm tra số điện thoại
    if (phoneRegex.test(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  }