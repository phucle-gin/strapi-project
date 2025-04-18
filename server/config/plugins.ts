export default {
  upload: {
    config: {
      provider: 'cloudinary', // or 'local'
      providerOptions: {
        cloud_name: 'your_cloud_name',
        api_key: 'your_api_key',
        api_secret: 'your_api_secret',
      },
      actionOptions: {
        upload: {
          // Don't request automatic image transformations
          // Cloudinary will just save the original
        },
      },
      breakpoints: {}, // 👈 disables all format breakpoints
    },
  },
};