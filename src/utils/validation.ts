export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

export function isValidPassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Kata sandi minimal 8 karakter' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Kata sandi harus mengandung huruf kapital' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Kata sandi harus mengandung huruf kecil' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Kata sandi harus mengandung angka' };
  }
  return { valid: true, message: '' };
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}
