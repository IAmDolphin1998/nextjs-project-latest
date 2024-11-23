import React from 'react';
import { Grid2 } from '@mui/material';
import { SearchInterface } from '@/components';

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <Grid2 container>
      <SearchInterface />
    </Grid2>
  );
}
