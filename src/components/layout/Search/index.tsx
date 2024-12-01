'use client';

import React from 'react';
import styles from './Search.module.css';
import {
  SearchResultsBox,
  FiltersResultsBox,
  MuiPagination,
  RefinementList,
} from '@/components/ui';
import { Box, Grid2, Stack } from '@mui/material';
import ListingHits from '../ListingHits';
import { Stats } from 'react-instantsearch';

type SearchProps = {
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ setAuthor }: SearchProps) {
  return (
    <>
      <Grid2 size={{ md: 3 }}>
        <Stack>
          <RefinementList
            boxTitle="Filter for Category"
            attribute="Area.Name"
            operator="and"
          />
          <RefinementList boxTitle="Filter for Tag" attribute="Tags.Name" />
        </Stack>
      </Grid2>
      <Grid2 size={{ md: 9 }}>
        <Stack>
          <Box>
            <Stack className={styles.filters} direction="row">
              <Stats />
              <Stack direction="row">
                <SearchResultsBox placeholder="Search ..." />
                <FiltersResultsBox
                  placeholder="Search per Author ..."
                  setAuthor={setAuthor}
                />
              </Stack>
            </Stack>
          </Box>
          <ListingHits
            transformItems={(items) => {
              return items.map((item) => ({
                ...item,
                Date: item.Date
                  ? new Date(item.Date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : new Date().toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }),
              }));
            }}
          />
          <MuiPagination />
        </Stack>
      </Grid2>
    </>
  );
}
