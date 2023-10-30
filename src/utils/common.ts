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
  var d = new Date();
  // d.setMinutes(d.getMinutes() + 30);
  d.setHours(d.getHours()+24);
  var expires = d.toUTCString();
  document.cookie = `${key}=${value}; expires=${expires}; path=${path}`;
};

export const getCookie = (name: string) => {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var cookieParts = cookie.split('=');
    if (cookieParts[0] === name) {
      return cookieParts[1];
    }
  }
  return null; // Cookie not found
};

export const clearAllCookies = () => {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf('=');
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  window.location.href = '/';
};
