'use client';

import React from 'react';
import styles from './MuiPagination.module.css';
import { Container, Pagination } from '@mui/material';
import { usePagination, UsePaginationProps } from 'react-instantsearch';

export default function MuiPagination(props: UsePaginationProps) {
  const { pages, currentRefinement, nbPages, refine } = usePagination(props);

  return (
    <Container>
      <Pagination
        className={styles.pagination}
        boundaryCount={2}
        count={nbPages}
        page={currentRefinement}
        showFirstButton
        showLastButton
        size="large"
        onChange={(event: React.ChangeEvent<unknown>, page: number) => {
          console.info('onChange: ', page);
          refine(page);
        }}
      />
    </Container>
  );
}
