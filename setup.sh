#!/bin/bash

curl -X DELETE "localhost:9200/songs?pretty"

curl -X PUT "localhost:9200/songs?pretty" -H "Content-Type: application/json" -d @./data/mapping.json

curl -X POST "localhost:9200/_bulk?pretty" -H 'Content-Type: application/json' --data-binary @./data/formatted.json
