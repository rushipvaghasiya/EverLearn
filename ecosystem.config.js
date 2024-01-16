module.exports = {
  apps: [{
    script: './bin/www',
    watch: '.',
    name: 'APP1',
    exec_mode: 'cluster',
    env: {
      SERVER_PORT: 3000
    }
  }, {
    script: './bin/www',
    watch: '.',
    name: 'APP2',
    // autorestart: false,
    env: {
      SERVER_PORT: 8000
    }
  }]
};
