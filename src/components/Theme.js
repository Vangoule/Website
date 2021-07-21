
import { red } from "@material-ui/core/colors"
import { createTheme } from "@material-ui/core/styles"

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto Condensed', sans-serif"
  }
})

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: red,
    background: {
      default: "#2a2a2a"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
      default: "#FFFFFF",
      main: "#FFFFFF"
    }
  }
})
const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: red,
    background: {
      default: "#CFD8DC"
    },
    text: {
      primary: "#222222",
      secondary: "#222222",
    }

  }
})

export { darkTheme, lightTheme }