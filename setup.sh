#!/bin/bash

curl -X DELETE "https://d62c3f64db3d43f4af267ec90873e4b9.us-central1.gcp.cloud.es.io/songs?pretty" -H "Authorization: ApiKey Z0V5MnhZVUI2UU92ODh0dmYtdDE6bUctMVUxQ3BUQzZKSVhnS1J0STd2Zw=="

curl -X PUT "https://d62c3f64db3d43f4af267ec90873e4b9.us-central1.gcp.cloud.es.io/songs?pretty" -H "Content-Type: application/json" -d @./data/mapping.json -H "Authorization: ApiKey Z0V5MnhZVUI2UU92ODh0dmYtdDE6bUctMVUxQ3BUQzZKSVhnS1J0STd2Zw=="

curl -X POST "https://d62c3f64db3d43f4af267ec90873e4b9.us-central1.gcp.cloud.es.io/_bulk?pretty" -H 'Content-Type: application/json' --data-binary @./data/formatted.json -H "Authorization: ApiKey Z0V5MnhZVUI2UU92ODh0dmYtdDE6bUctMVUxQ3BUQzZKSVhnS1J0STd2Zw=="
