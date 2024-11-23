import theme from '@/hooks/createTheme';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';

export default function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className="main-content">{children}</Container>
    </ThemeProvider>
  );
}
