
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

### Setting up elastic search
In the root folder run `setup.sh`. It will crete the index and add bulk songs to the elastic search.

### Setting up back end
Go to backend folder by running `cd ./backend` in terminal.
