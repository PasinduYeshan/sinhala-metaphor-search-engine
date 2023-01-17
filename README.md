
## Instructions

### Create formatted.json
```
cd data
python3 converter.py
```


### Put mapping into Elastic search

```
PUT <index_name>
mapping content
```

### Put songs into Elastic Search

```
POST _bulk
songs
```