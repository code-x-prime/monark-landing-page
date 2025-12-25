module.exports = {
    apps: [
        {
            name: 'Monarkfx-landing',
            cwd: '/root/monark-landing-page',
            script: 'npm',
            args: 'start',
            env: {
                PORT: 3001,
                NODE_ENV: 'production'
            },
            error_file: "/root/.pm2/logs/monark-landing-page-error.log",
            out_file: "/root/.pm2/logs/monark-landing-page-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss",
            max_memory_restart: "500M"
        },
    ]
}