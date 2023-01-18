//in server/create-api-key.js
const { Client } = require('@elastic/elasticsearch');
const config = require('config');

const elasticConfig = config.get('elastic');

const client = new Client({
  cloud: {
    id: elasticConfig.cloudID,
  },
  auth: {
    username: elasticConfig.username,
    password: elasticConfig.password,
  },
});

// remove following error for ts

client.ping()
  .then((response) => console.log("You are connected to Elasticsearch!"))
  .catch((errory )=> console.error("Elasticsearch is not connected."))

async function generateApiKeys(opts) {
  const body = await client.security.createApiKey({
    body: {
      name: 'songs_app',
      role_descriptors: {
        songs_app_role: {
          cluster: ['monitor'],
          index: [
            {
              names: ['songs'],
              privileges: ['create_index', 'write', 'read', 'manage'],
            },
          ],
        },
      },
    },
  });
  return Buffer.from(`${body.id}:${body.api_key}`).toString('base64');
}

generateApiKeys()
  .then(console.log)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });