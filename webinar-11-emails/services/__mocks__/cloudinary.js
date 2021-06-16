module.exports = {
  v2: {
    config: () => {},
    uploader: {
      upload: (a, b, cb) => {
        cb(null, { public_id: "public-id", secure_url: "secure-url" });
      },
    },
  },
};
