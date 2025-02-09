// Constant declarations
const colors = {
  black: "#000000",
  white: "#ffffff",
  "bricky-brick": "#b73d25",
  "namara-grey": "#7b7b7b",
  "moon-veil": "#8B9BB1",
}

const themes = {
  light: {
    primary: colors.white,
    secondary: colors.black,
    contrast: colors["bricky-brick"],
  },
  dark: {
    primary: colors.black,
    secondary: colors.white,
    contrast: colors["bricky-brick"],
  },
  "bricky-brick": {
    primary: colors["bricky-brick"],
    secondary: colors.black,
    contrast: colors.white,
  },
}

const breakpoints = {
  dt: 800,
  dd: 1200,
}

const screens = {
  mobile: { width: 375, height: 650 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 816 },
}

/** @type {(keyof typeof themes)[]} */
const themeNames = Object.keys(themes)

const config = {
  themes,
}

export { breakpoints, colors, config, screens, themeNames, themes }
