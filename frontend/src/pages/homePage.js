import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

export default function HomePage() {
  return (
    <div className="Container p-4">
      <div className="flex flex-row px-2">
        <div className="col px-4">
          <TextField id="outlined-basic" label="Search Bar" variant="outlined" />
        </div>
        <div className="col px-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[{ title: "The Shawshank Redemption", year: 1994 }]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Combo box" />
            )}
          />
        </div>
        <div className="col px-4">
          <Button variant="outlined">Search</Button>
        </div>
      </div>
    </div>
  );
}
