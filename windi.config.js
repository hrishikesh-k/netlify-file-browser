import {defineConfig} from 'windicss/helpers'
export default defineConfig({
  attributify: {
    prefix: 'w-'
  },
  darkMode: 'class',
  extract: {
    include: ['./index.html', './src/**/*.vue']
  },
  plugins: [require('@windicss/plugin-scrollbar'), require('windicss/plugin/aspect-ratio')],
  theme: {
    boxShadow: {
      shallow: '0 1px 10px 0 hsla(210, 7%, 22%, .06), 0 2px 4px 0 hsla(210, 7%, 22%, .08)'
    },
    colors: {
      black: 'var(--black)',
      code: 'var(--code)',
      current: 'currentColor',
      hover: 'var(--hover)',
      none: 'none',
      overlay: 'var(--overlay)',
      page: 'var(--page)',
      white: 'var(--white)',
      blue100: 'var(--blue100)',
      blue200: 'var(--blue200)',
      blue300: 'var(--blue300)',
      blue400: 'var(--blue400)',
      blue500: 'var(--blue500)',
      gold100: 'var(--gold100)',
      gold200: 'var(--gold200)',
      gold300: 'var(--gold300)',
      gold400: 'var(--gold400)',
      gold500: 'var(--gold500)',
      gray100: 'var(--gray100)',
      gray200: 'var(--gray200)',
      gray300: 'var(--gray300)',
      gray400: 'var(--gray400)',
      gray500: 'var(--gray500)',
      gray600: 'var(--gray600)',
      gray700: 'var(--gray700)',
      purple100: 'var(--purple100)',
      purple200: 'var(--purple200)',
      purple300: 'var(--purple300)',
      purple400: 'var(--purple400)',
      purple500: 'var(--purple500)',
      red100: 'var(--red100)',
      red200: 'var(--red200)',
      red300: 'var(--red300)',
      red400: 'var(--red400)',
      red500: 'var(--red500)',
      teal100: 'var(--teal100)',
      teal200: 'var(--teal200)',
      teal300: 'var(--teal300)',
      teal400: 'var(--teal400)',
      teal500: 'var(--teal500)'
    },
    extend: {
      height: {
        fit: 'fit-content'
      },
      screens: {
        xs: '480px'
      },
      width: {
        cardTitle: 'calc(100% - (7.5rem + 0.75rem))',
        file: 'calc(100% - 0.5rem)',
        fit: 'fit-content',
        gap2: 'calc(50% - 0.375rem)'
      }
    },
    fontFamily: {
      mono: ['Ubuntu mono', 'monospace'],
      sans: ['Ubuntu', 'sans-serif']
    }
  }
})