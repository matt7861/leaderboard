import { createTheme } from "@mui/material";

const theme = createTheme({
  transitions: {
    duration: {
      standard: 1000,
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
  },
});

export default theme;
