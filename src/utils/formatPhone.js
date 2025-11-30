export function formatPhone(phone) {
  // expects digits like 998991234567 or +998991234567
  const digits = ('' + phone).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('998')) {
    return '+' + digits.slice(0,3) + ' ' + digits.slice(3,5) + ' ' + digits.slice(5,8) + ' ' + digits.slice(8,10) + ' ' + digits.slice(10,12);
  }
  return phone;
}
