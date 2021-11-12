import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function SearchField(props) {
  const [value, setValue] = useState("");

  function search(key) {
    setValue(key)
    props.search(key)
  }

  return (
    <TextField
      placeholder="Search"
      type="text"
      variant="outlined"
      size="small"
      onChange={(e) => search(e.target.value)}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),

        endAdornment: value && (
          <IconButton
            onClick={() => search("")}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )
      }}
    />
  );
}
