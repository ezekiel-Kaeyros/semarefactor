import axios from 'axios';
export const newUploadToCloudinary = async (image: any, url: any) => {
  const data = new FormData();
  data.append('file', image);
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const response = await axios.post(url + '/upload-image', data, { headers });
  // // ;

  return response;
};
