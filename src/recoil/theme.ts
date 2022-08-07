import type { PaletteMode } from "@mui/material";
import { atom, useRecoilState, useRecoilValue } from "recoil";

export type ThemeState = { mode: PaletteMode };

export const themeState = atom<ThemeState>({
  key: "theme",
  default: { mode: "dark" },
});

export const useThemeState = () => useRecoilValue(themeState);

export const useFlipThemeState = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const flip = () => {
    if (theme.mode === "light") {
      setTheme({ mode: "dark" });
      window.localStorage.setItem("theme", "dark");
    }

    if (theme.mode === "dark") {
      setTheme({ mode: "light" });
      window.localStorage.setItem("theme", "light");
    }
  };

  return {
    flip,
    theme,
  };
};
