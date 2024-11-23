'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
    },
    MuiGrid2: {
      defaultProps: {
        spacing: 3,
      },
    },
    MuiStack: {
      defaultProps: {
        spacing: 3,
        useFlexGap: true,
      },
    },
  },
});

export default theme;
