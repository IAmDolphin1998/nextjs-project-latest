'use client';

import React, { useState } from 'react';
import styles from './SearchResultsBox.module.css';
import { Search as SearchIcon } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch';

type SearchResultsBoxProps = {
  placeholder: string;
} & UseSearchBoxProps;

export default function SearchResultsBox({
  placeholder,
  ...props
}: SearchResultsBoxProps) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      size="medium"
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          refine(inputValue);
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              edge="start"
              onClick={(event) => {
                refine(inputValue);
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
