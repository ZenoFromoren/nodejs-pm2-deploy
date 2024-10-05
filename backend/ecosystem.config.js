const dotenv = require("dotenv");
dotenv.config({ path: ".env.deploy" });

const { DEPLOY_KEY, DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPOSITORY, DEPLOY_REF } =
  process.env;

module.exports = {
  apps: [
    {
      name: "nodejs-pm2-deploy",
      script: "dist/app.js",
    },
  ],
  deploy: {
    production: {
      key: DEPLOY_KEY,
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPOSITORY,
      path: DEPLOY_PATH,
      "pre-deploy-local": `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      "post-deploy":
        "cd backend && pwd && npm ci && npm run build startOrRestart ecosystem.config.js --env production",
    },
  },
};
