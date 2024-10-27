// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'api',
      script: 'npm',
      args: 'start',
      cwd: './dist',
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
    },
  ],
};
