module.exports = {
  apps: [
    {
      name: "app",
      script: "npm",
      args: "start",
      cwd: "./",
      watch: true,
      ignore_watch: ["node_modules", ],
    },
  ],
};
