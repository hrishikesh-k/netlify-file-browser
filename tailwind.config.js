module.exports = {
  corePlugins: ['alignItems', 'animation', 'appearance', 'backgroundColor', 'borderColor', 'borderRadius', 'borderWidth', 'boxShadow', 'cursor', 'display', 'fill', 'flex', 'flexGrow', 'flexShrink', 'flexWrap', 'fontSize', 'fontWeight', 'height', 'inset', 'justifyContent', 'listStyleType', 'margin', 'maxHeight', 'maxWidth', 'minHeight', 'opacity', 'outline', 'overflow', 'padding', 'pointerEvents', 'position', 'preflight', 'rotate', 'space', 'stroke', 'textAlign', 'textColor', 'textDecoration', 'textOverflow', 'transform', 'verticalAlign', 'width', 'wordBreak', 'zIndex'],
  darkMode: 'class',
  content: ['./index.html', './src/**/*.vue'],
  mode: 'jit',
  plugins: [require('tailwind-scrollbar'), require('tailwindcss-selection-variant')],
  safelist: ['h-4', 'w-4'],
  theme: {
    colors: {
      black: 'var(--black)',
      code: 'var(--code)',
      goldDarkest: 'var(--goldDarkest)',
      goldLighter: 'var(--goldLighter)',
      goldLightest: 'var(--goldLightest)',
      grayLighter: 'var(--grayLighter)',
      grayLightest: 'var(--grayLightest)',
      grayDark: 'var(--grayDark)',
      grayDarker: 'var(--grayDarker)',
      grayDarkest: 'var(--grayDarkest)',
      overlay: 'var(--overlay)',
      pageBG: 'var(--pageBG)',
      redDarker: 'var(--redDarker)',
      redDarkest: 'var(--redDarkest)',
      redLighter: 'var(--redLighter)',
      redLightest: 'var(--redLightest)',
      tealDarker: 'var(--tealDarker)',
      tealDarkest: 'var(--tealDarkest)',
      tealLighter: 'var(--tealLighter)',
      tealLightest: 'var(--tealLightest)',
      tealSelection: 'var(--tealSelection)',
      white: 'var(--white)'
    },
    extend: {
      maxHeight: {
        'fit': 'fit-content'
      }
    },
    fill: {
      current: 'currentColor',
      none: 'none'
    },
    screens: {
      s: '425px',
      m: '640px',
      l: '1024px'
    },
    stroke: {
      current: 'currentColor',
      none: 'none'
    }
  }
}