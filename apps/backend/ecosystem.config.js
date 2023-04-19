module.exports = {
  apps: [
    {
      name: "mif backend",
      script: "yarn",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
