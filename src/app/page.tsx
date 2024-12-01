import React from 'react';
import { Typography, Link } from '@mui/material';

export default function Home() {
  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Welcome on UniPaper!
      </Typography>
      <Typography>
        This is a simple project to show the potential of distributed search
        using Algolia. To find out more, click{' '}
        <Link href="/search" underline="hover">
          here
        </Link>
        !
      </Typography>
    </div>
  );
}
