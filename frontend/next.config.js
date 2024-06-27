/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'back.chatbot.sem-a.com',
        port: '',
      },
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};
