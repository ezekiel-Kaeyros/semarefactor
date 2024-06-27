'use server';

import axios from 'axios';
import path from 'path';
//const fs = require('fs');

export const sessionImport = async (
  apiVersion: string,
  appId: string,
  fileLength: string,
  fileType: string,
  accessToken: string
) => {
  ('use server');
  const firstResponse = await axios.post(
    `https://graph.facebook.com/${apiVersion}/${appId}/uploads?file_length=${fileLength}&file_type=${fileType}&access_token=${accessToken}`
  );

  // ;

  let uploadSessionId = firstResponse.data.id;

  // Default file path
  //var filePath = path.join('./', 'bulk-messages/cat.png');
  let filePath =
    'https://res.cloudinary.com/dyekwrvwe/image/upload/v1700917326/samples/cloudinary-group.jpg';
  // ;

  const imageBuffer = await fetch(filePath).then((response) => response.blob());

  // ;

  // const imageBuffer = fs.readFileSync(filePath);
  // // ;

  // Request headers
  const headers = {
    Authorization: `OAuth ${accessToken}`,
    file_offset: 0,
    'Content-Type': 'multipart/form-data', // Set the content type to binary data
  };

  const secondResponse = await axios.post(
    `https://graph.facebook.com/${apiVersion}/${uploadSessionId}`,
    imageBuffer,
    { headers }
  );

  //Second response data
  // ;

  let imageHandle = secondResponse.data.h;

  // ;

  return imageHandle;
};
