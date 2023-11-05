export const updateFileName = (fileName: string) => {
  if (fileName && fileName.trim() === '') return '';
  const currentTimestamp = new Date().getTime();
  const parts = fileName.split(/(\.[^.]+)$/);
  const fileNameWithoutExtension = parts[0]; // Get the file name without extension
  const fileExtension = parts[1]; // Get the file extension

  // Create a new name by appending a timestamp
  const newFileName = `${fileNameWithoutExtension}_${currentTimestamp}${fileExtension}`;
  return newFileName;
};

export const addCookie = (key: string, value: string, path: string = '/') => {
  const d = new Date();
  // d.setMinutes(d.getMinutes() + 30);
  d.setHours(d.getHours() + 24);
  const expires = d.toUTCString();
  document.cookie = `${key}=${value}; expires=${expires}; path=${path}`;
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const cookieParts = cookie.split('=');
    if (cookieParts[0] === name) {
      return cookieParts[1];
    }
  }
  return null; // Cookie not found
};

export const clearAllCookies = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  localStorage.clear();
  window.location.href = '/';
};

export const isValidMail = (email: string) => {
  if (!email.trim()) return '';
  // const isValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  return isValidEmail;
};
