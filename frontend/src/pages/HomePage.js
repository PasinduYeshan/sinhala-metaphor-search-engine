import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import OutlinedCard from "../component/Card";

export default function HomePage() {
  const [fieldFilter, setFieldFilter] = useState("");
  const [searchBarValue, setSearchBarValue] = useState("");

  const handleFieldFilterChange = (event) => {
    setFieldFilter(event.target.value);
  };

  const handleSearchBarChange = (event) => {
    setSearchBarValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Container p-4">
      <div className="flex flex-row px-2">
        <div className="col px-4">
          <TextField
            id="outlined-basic"
            label="Search Bar"
            variant="outlined"
            value={searchBarValue}
            onChange={handleSearchBarChange}
          />
        </div>
        <div className="col px-4">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={fieldFilter}
              onChange={handleFieldFilterChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {fieldFilterOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Filter by Fields</FormHelperText>
          </FormControl>
        </div>
        <div className="col px-4">
          <Button variant="outlined">Search</Button>
        </div>
      </div>
      <div className="flex p-4 row w-full">
        <div className="col col-8 p-2">
          {songDetails.map((song) => OutlinedCard({ song: song["_source"] }))}
        </div>
        <div className="col col-4 p-2">
          <div className="flex flex-row">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={fieldFilter}
                onChange={handleFieldFilterChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {fieldFilterOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Filter by Singers</FormHelperText>
            </FormControl>
          </div>
          <div className="flex flex-row">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={fieldFilter}
                onChange={handleFieldFilterChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {fieldFilterOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Filter by Lyricist</FormHelperText>
            </FormControl>
          </div>
          <div className="flex flex-row">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={fieldFilter}
                onChange={handleFieldFilterChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {fieldFilterOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Filter by Composer</FormHelperText>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

const fieldFilterOptions = [
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

const songDetails = [
  {
    _index: "songs",
    _id: "S7PqxIUBYPr1oOHYXyVJ",
    _score: 1,
    _ignored: ["Lyrics.keyword"],
    _source: {
      "Title Sinhala": "අහසයි ඔබ මට",
      "Title English": "Ahasai Oba Mata",
      "Singer Sinhala": "සුනිල් එදිරිසිංහ",
      "Singer English": "Sunil Edirisinghe",
      "Lyricist Sinhala": "බන්ධුල නානායක්කාර",
      "Lyricist English": "Bandula Nanayakkare",
      "Composer Sinhala": "රෝහණ වීරසිංහ",
      "Composer English": "Rohana Weerasinghe",
      Lyrics:
        "අහසයි ඔබ මට නිම් හිම් නොපෙනෙන ඉණිමං බඳිනු බැරී පොළොවයි ඔබ මට තරුවක් විලසට රෑ කල පතිත වෙමි //  ගඟේ වතුර නෑ ඉහලට ගලා ගියේ අසිනි හඬින් නෑ කඳු බිම් සසල උනේ ගඟ කවදා හෝ මුව දොර හමු වෙනවා ලොව කැලඹුණු දා කඳු බිම් හැකිලෙනවා  අහසයි ඔබ මට...  අනාත සයුරට වැහි දිය දෝත ඔබයි අගාධ අඳුරක දුල රන් සිළුව ඔබයි ඔබ මට ලඟ බව ඉඳුරා මම දනිමී ඔබ වට කහවනු පවුරට මහ දුරකී  අහසයි ඔබ මට... //",
      Metaphor: "අහසයි ඔබ;පොළොවයි ඔබ",
      "Source Domain": "අහස;පොළොව",
      "Target Domain": "ඔබ;ඔබ",
      Interpretation:
        "ඔබ අහසක් වගේ මා හට ළඟා කර ගැනීමට නොහැක;මා තරුවක් නම් පොළොව අහසට දුරස් සේ ඔබට ළං වීමට නොහැක",
    },
  },
  {
    _index: "songs",
    _id: "TLPqxIUBYPr1oOHYXyVJ",
    _score: 1,
    _ignored: ["Lyrics.keyword"],
    _source: {
      "Title Sinhala": "හදේ කොතැනක",
      "Title English": "Hade Kothanaka",
      "Singer Sinhala": "සුනිල් එදිරිසිංහ",
      "Singer English": "Sunil Edirisinghe",
      "Lyricist Sinhala": "කුමාරදාස සපුතන්ත්‍රි",
      "Lyricist English": "Kumaradasa Saputhanthri",
      "Composer Sinhala": "රෝහණ වීරසිංහ",
      "Composer English": "Rohana Weerasinghe",
      Lyrics:
        " හදේ කොතැනක හෝ හිඳී ඔබ නිදා නොනිදා මෙන් බලා අවසර සොයා කල් දැන වෙලා හස රැහැනින් පෙළයි මා, මුදා සුව දැහැනින් //  සයුර ඉම රත් සිතිජ රේඛාවේ මියෙන හිරු සේ ගිලී ගිම් අඳුරේ තලා මා සිත පලා ගිය ඔබ දවයි මා….හද, තනිවෙනා මොහොතින්  හදේ කොතැනක...  උතුම් පිවිතුරු ප්‍රේමයේ නාමෙන් සහස් සුවහස් පැතුම් බල මහිමෙන් ඉනූ කඳුලද සිඳෙන්නට පෙර යදින්නම්…. ඔබ, මැකී යනු මතකෙන්  හදේ කොතැනක… ",
      Metaphor:
        "සයුර ඉම රත් සිතිජ රේඛාවේ මියෙන හිරු සේ ගිලී ගිම් අඳුරේ තලා මා සිත පලා ගිය ඔබ දවයි මා",
      "Source Domain": "මියෙන හිරු",
      "Target Domain": "මගේ සිත",
      Interpretation:
        "බැසයන හිරු ලෝකයක් අඳුරේ ගිල්වා යන්නාක් මෙන් ඔබ මා සිත වේදනාවේ ගිල්වා නික්ම යයි",
    },
  },
];
