import type { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { FunctionComponent, ReactNode } from "react";

import { useThemeState } from "./recoil/theme";

declare module "@mui/material/styles" {
  interface Theme {}
  interface ThemeOptions {}
}

const getTheme = (mode: PaletteMode) => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          height: 100%;
        },
        body {
          height: 100%
        },
        #root {
          height: 100%;
        }
      `,
    },
  },
  palette: {
    mode,
    ...(mode === "dark" && {
      background: {
        default: "#333",
      },
    }),
  },
});

export const theme = (mode: PaletteMode) => createTheme(getTheme(mode));

interface AppThemeProviderProps {
  children: ReactNode;
}

export const AppThemeProvider: FunctionComponent<AppThemeProviderProps> = ({
  children,
}) => {
  const themeState = useThemeState();

  return (
    <ThemeProvider theme={theme(themeState.mode)}>
      <>
        <CssBaseline />
        {children}
      </>
    </ThemeProvider>
  );
};
