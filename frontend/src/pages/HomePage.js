import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import OutlinedCard from "../component/Card";
import api from "../api";
import { Grid } from "@mui/material";

export default function HomePage() {
  const [fieldFilter, setFieldFilter] = useState("");
  const [searchBarValue, setSearchBarValue] = useState("");
  const [songs, setSongs] = useState([]);
  const [aggregations, setAggregations] = useState([]);
  const [singerFilter, setSingerFilter] = useState([]);
  const [lyricistFilter, setLyricistFilter] = useState([]);
  const [composerFilter, setComposerFilter] = useState([]);
  const [phraseSearch, setPhraseSearch] = useState(false);

  /**
   * Fetch meta data aggregations from backend
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const metaData = await api.meta.data();
        console.log(metaData.data);
        setAggregations(metaData.data.aggregations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData().catch((err) => console.log(err));
  }, []);

  /**
   * Handlers
   * @param {*} event
   */
  const handleFieldFilterChange = (event) => {
    console.log(event.target.value);
    setFieldFilter(event.target.value);
  };

  const handleSearchBarChange = (event) => {
    setSearchBarValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!searchBarValue || searchBarValue == "") {
      alert("Please enter a search query");
    }

    // Get field values to list where fieldState is true
    const fieldValues = Object.keys(fieldState).filter(
      (key) => fieldState[key] == true
    );
    console.log(fieldValues);
    await fetchData(searchBarValue, fieldValues);
  };

  /**
   * Fetch songs from backend
   * @param {*} queryValue
   * @param {*} fieldValue
   */
  const fetchData = async (queryValue, fieldValue) => {
    try {
      const res = await api.query.search({
        queryData: {
          query: queryValue,
          fieldFilter: fieldValue,
          phraseSearch: phraseSearch,
        },
      });
      console.log(res);
      if (res.status != 200) {
        alert(res.message);
      } else {
        setSongs(res.data.hits);
        setAggregations(res.data.aggregations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Field filters
   */

  const [fieldState, setFieldState] = useState({
    "Target Domain": false,
    "Source Domain": false,
    "Title Sinhala": false,
    "Title English": false,
    "Singer Sinhala": false,
    "Singer English": false,
    "Lyricist Sinhala": false,
    "Lyricist English": false,
    "Composer Sinhala": false,
    "Composer English": false,
    Lyrics: false,
    Metaphor: false,
    "Source Domain": false,
    "Target Domain": false,
    Interpretation: false,
  });

  const handleChange = (event) => {
    setFieldState({
      ...fieldState,
      [event.target.name]: event.target.checked,
    });
    console.log(event.target.name, event.target.checked);
  };

  /**
   * Side filters
   * @param {*} event
   */
  const handleFilterBySinger = async (event) => {
    const query = event.target.value;
    setSingerFilter(query);
    await fetchData(query, ["Singer Sinhala"]);
  };

  const handleFilterByLyricist = async (event) => {
    const query = event.target.value;
    setLyricistFilter(query);
    await fetchData(query, ["Lyricist Sinhala"]);
  };

  const handleFilterByComposer = async (event) => {
    const query = event.target.value;
    setComposerFilter(query);
    await fetchData(query, ["Composer Sinhala"]);
  };

  /**
   * Clear all the filters
   */

  const handleClear = async (event) => {
    event.preventDefault();
    setFieldFilter("");
    setSearchBarValue("");
    setSingerFilter("");
    setLyricistFilter("");
    setComposerFilter("");
    setSongs([]);
    setFieldState({
      "Target Domain": false,
      "Source Domain": false,
      "Title Sinhala": false,
      "Title English": false,
      "Singer Sinhala": false,
      "Singer English": false,
      "Lyricist Sinhala": false,
      "Lyricist English": false,
      "Composer Sinhala": false,
      "Composer English": false,
      Lyrics: false,
      Metaphor: false,
      "Source Domain": false,
      "Target Domain": false,
      Interpretation: false,
    });
  };

  return (
    <div className="Container p-0 m-0">
      <AppBar position="static" className="h-12 mb-2">
        {" "}
        <Typography
          className="px-4"
          variant="h6"
          color="inherit"
          component="div"
        >
          Sinhala Song Search Engine
        </Typography>{" "}
      </AppBar>
      <div className="Container p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className=" px-4">
            <TextField
              id="outlined-basic"
              label="Search Bar"
              variant="outlined"
              value={searchBarValue}
              onChange={handleSearchBarChange}
            />
          </div>
          <div className=" px-4">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={phraseSearch}
                    onChange={(e) => {
                      setPhraseSearch(e.target.checked);
                      console.log("Changed");
                    }}
                    name="Phrase Search"
                  />
                }
                label="Phrase Search"
              />
            </FormGroup>
          </div>

          <div className="flex flex-row px-4">
            <div className="px-2">
              <Button variant="outlined" onClick={handleSubmit}>
                Search
              </Button>
            </div>
            <div className="">
              <Button variant="outlined" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className=" px-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Title Sinhala"]}
                  onChange={handleChange}
                  name="Title Sinhala"
                />
              }
              label="Title Sinhala"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Title English"]}
                  onChange={handleChange}
                  name="Title English"
                />
              }
              label="Title English"
            />
          </FormGroup>
        </div>
        <div className=" px-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Lyricist Sinhala"]}
                  onChange={handleChange}
                  name="Lyricist Sinhala"
                />
              }
              label="Lyricist Sinhala"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Lyricist English"]}
                  onChange={handleChange}
                  name="Lyricist English"
                />
              }
              label="Lyricist English"
            />
          </FormGroup>
        </div>
        <div className=" px-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Composer Sinhala"]}
                  onChange={handleChange}
                  name="Composer Sinhala"
                />
              }
              label="Composer Sinhala"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Composer English"]}
                  onChange={handleChange}
                  name="Composer English"
                />
              }
              label="Composer English"
            />
          </FormGroup>
        </div>
        <div className=" px-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Singer Sinhala"]}
                  onChange={handleChange}
                  name="Singer Sinhala"
                />
              }
              label="Singer Sinhala"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Singer English"]}
                  onChange={handleChange}
                  name="Singer English"
                />
              }
              label="Singer English"
            />
          </FormGroup>
        </div>
        <div className=" px-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Source Domain"]}
                  onChange={handleChange}
                  name="Source Domain"
                />
              }
              label="Source Domain"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Target Domain"]}
                  onChange={handleChange}
                  name="Target Domain"
                />
              }
              label="Target Domain"
            />
          </FormGroup>
        </div>
        <div className=" px-4">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Metaphor"]}
                  onChange={handleChange}
                  name="Metaphor"
                />
              }
              label="Metaphor"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fieldState["Lyrics"]}
                  onChange={handleChange}
                  name="Lyrics"
                />
              }
              label="Lyrics"
            />
          </FormGroup>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4 pl-4">
        <div className="">
          <div className="flex flex-row">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={singerFilter}
                onChange={handleFilterBySinger}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {aggregations?.singer_agg?.buckets.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.key}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Filter by Singers</FormHelperText>
            </FormControl>
          </div>
          <div className="flex flex-row">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={lyricistFilter}
                onChange={handleFilterByLyricist}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {aggregations?.lyricist_agg?.buckets.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.key}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Filter by Lyricist</FormHelperText>
            </FormControl>
          </div>
          <div className="flex flex-row">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={composerFilter}
                onChange={handleFilterByComposer}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {aggregations?.composer_agg?.buckets.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.key}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Filter by Composer</FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className="col-span-2">
          {songs.length > 0
            ? songs.map((song) => OutlinedCard({ song: song["_source"] }))
            : ""}
        </div>
      </div>
    </div>
  );
}

const fieldFilterOptions = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Title Sinhala",
    label: "Title Sinhala",
  },
  {
    value: "Title English",
    label: "Title English",
  },
  {
    value: "Singer Sinhala",
    label: "Singer Sinhala",
  },
  {
    value: "Singer English",
    label: "Singer English",
  },
  {
    value: "Lyricist Sinhala",
    label: "Lyricist Sinhala",
  },
  {
    value: "Lyricist English",
    label: "Lyricist English",
  },
  {
    value: "Composer Sinhala",
    label: "Composer Sinhala",
  },
  {
    value: "Composer English",
    label: "Composer English",
  },
  {
    value: "Interpretation",
    label: "Interpretation",
  },
  {
    value: "Source Domain",
    label: "Source Domain",
  },
  {
    value: "Source Target",
    label: "Source Target",
  },
  {
    label: "Metaphor",
    value: "Metaphor",
  },
  {
    label: "Lyrics",
    value: "Lyrics",
  },
];
