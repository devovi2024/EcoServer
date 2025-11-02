class Validation {
  static isNull(value) {
    return value === undefined || value === null || value.toString().trim() === "";
  }

  static isEmail(value) {
    if (this.isNull(value)) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  static isMobile(value) {
    if (this.isNull(value)) return false;
    const regex = /^(?:\+?88)?01[3-9]\d{8}$/;
    return regex.test(value.toString());
  }
}

export default Validation;
