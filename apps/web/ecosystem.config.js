module.exports = {
  apps: [
    {
      name: "mif web",
      script: "yarn",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
