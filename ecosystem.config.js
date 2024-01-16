
module.exports = {
    apps: [
        {
            name: 'easetrail',
            script: 'npm',
            args: 'start',
            cwd: '/var/www/easetrail',
            instances: 'max',
            autorestart: true,
            watch: true,
            max_memory_restart: '10G',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
  };
  
