//in server/elasticsearch/client.js
const { Client } = require('@elastic/elasticsearch');
const config = require('config');

const elasticConfig = config.get('elastic');

const client = new Client({
  cloud: {
    id: elasticConfig.cloudID,
  },
  auth: {
    apiKey: elasticConfig.apiKey,
  },
});

// remove following error for ts

client.ping()
  .then((response : any) => console.log("You are connected to Elasticsearch!"))
  .catch((error : any )=> console.error("Elasticsearch is not connected."))

export default client;