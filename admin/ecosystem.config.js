module.exports = {
  apps: [
    {
      name: "admin",
      script: "npm",
      args: "start",
      cwd: "./",
      watch: true,
      ignore_watch: ["node_modules", ],
    },
  ],
};
