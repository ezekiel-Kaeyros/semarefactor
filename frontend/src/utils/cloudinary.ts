import axios from "axios"
export const uploadToCloudinary =  async (image: any) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'dba_preset');
  data.append('cloud_name', 'kaeyros_analytics');

  const response = await axios.post("https://api.cloudinary.com/v1_1/kaeyros-cloudinary/image/upload", data);

  return response;
}