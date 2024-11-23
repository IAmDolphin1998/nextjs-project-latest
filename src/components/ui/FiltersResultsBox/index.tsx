'use client';

import React, { useState } from 'react';
import styles from './FiltersResultsBox.module.css';
import { Search as SearchIcon } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';

type FiltersResultsBoxProps = {
  placeholder: string;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
};

export default function FiltersResultsBox({
  placeholder,
  setAuthor,
}: FiltersResultsBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      size="medium"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          setAuthor(searchTerm);
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              edge="start"
              onClick={(event) => {
                setAuthor(searchTerm);
              }}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      className={styles.wrapper}
    />
  );
}
