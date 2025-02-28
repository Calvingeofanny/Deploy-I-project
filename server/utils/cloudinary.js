const cloudinary = require("cloudinary").v2;

// // Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
// });
cloudinary.config({
  cloud_name: "dnbpssjbu",
  api_key: "678543683651123",
  api_secret: "d5rCZKxT2froYPJ4GfeE7S4Wxp0",
});
module.exports = cloudinary;
