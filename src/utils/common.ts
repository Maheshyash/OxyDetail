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
