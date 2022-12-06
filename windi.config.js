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
      animation: {
        bg: 'bg 3s infinite',
        border: 'border 3s linear infinite',
        fill: 'fill 3s infinite',
        line1: 'line1 3s infinite, stroke 3s infinite',
        line2: 'line2 3s infinite, stroke 3s infinite',
        line3: 'line3 3s infinite, stroke 3s infinite',
        line4: 'line4 3s infinite, stroke 3s infinite',
        line5: 'line5 3s infinite, stroke 3s infinite',
        line6: 'line6 3s infinite, stroke 3s infinite',
        logo: 'logo 3s infinite',
        node1: 'node1 3s infinite, fill 3s infinite',
        node2: 'node2 3s infinite, fill 3s infinite',
        node3: 'node3 3s infinite, fill 3s infinite',
        node4: 'node4 3s infinite, fill 3s infinite',
        stroke: 'stroke 3s infinite'
      },
      height: {
        fit: 'fit-content'
      },
      keyframes: {
        bg: {
          '0%, 70%': {
            'opacity': '0'
          },
          '90%': {
            'opacity': '1'
          },
          '100%': {
            'opacity': '0'
          }
        },
        border: {
          '0%': {
            'stroke-dashoffset': '240'
          },
          '50%, 100%': {
            'stroke-dashoffset': '0'
          },
          '0%, 60%': {
            'opacity': '1'
          },
          '75%, 100%': {
            'opacity': '0'
          }
        },
        fill: {
          '0%, 60%': {
            'fill': '#5cebdf'
          },
          '75%, 100%': {
            'fill': 'var(--logoAnimationPrimary)'
          }
        },
        line1: {
          '0%, 25%': {
            'stroke-dashoffset': '140'
          },
          '75%, 100%': {
            'stroke-dashoffset': '0'
          }
        },
        line2: {
          '0%, 30%': {
            'stroke-dashoffset': '140'
          },
          '80%, 100%': {
            'stroke-dashoffset': '0'
          }
        },
        line3: {
          '0%, 35%': {
            'stroke-dashoffset': '140'
          },
          '85%, 100%': {
            'stroke-dashoffset': '0'
          }
        },
        line4: {
          '0%, 40%': {
            'stroke-dashoffset': '140'
          },
          '90%, 100%': {
            'stroke-dashoffset': '0'
          }
        },
        line5: {
          '0%, 45%': {
            'stroke-dashoffset': '140'
          },
          '95%, 100%': {
            'stroke-dashoffset': '0'
          }
        },
        line6: {
          '0%, 40%': {
            'stroke-dashoffset': '140'
          },
          '80%, 100%': {
            'stroke-dashoffset': '0'
          }
        },
        logo: {
          '0%, 70%': {
            'transform': 'rotate(-45deg) scale(1)'
          },
          '90%': {
            'transform': 'rotate(-45deg) scale(1.15)'
          },
          '95%, to': {
            'transform': 'rotate(-45deg) scale(1)'
          }
        },
        node1: {
          '0%, 30%': {
            'transform': 'scale(0)'
          },
          '40%': {
            'transform': 'scale(1.2)'
          },
          '50%, 100%': {
            'transform': 'scale(1)'
          }
        },
        node2: {
          '0%, 35%': {
            'transform': 'scale(0)'
          },
          '45%': {
            'transform': 'scale(1.2)'
          },
          '55%, 100%': {
            'transform': 'scale(1)'
          }
        },
        node3: {
          '0%, 40%': {
            'transform': 'scale(0)'
          },
          '50%': {
            'transform': 'scale(1.2)'
          },
          '60%, 100%': {
            'transform': 'scale(1)'
          }
        },
        node4: {
          '0%, 45%': {
            'transform': 'scale(0)'
          },
          '55%': {
            'transform': 'scale(1.2)'
          },
          '65%, 100%': {
            'transform': 'scale(1)'
          }
        },
        stroke: {
          '0%, 60%': {
            'stroke': '#5cebdf'
          },
          '75%, 100%': {
            'stroke': 'var(--logoAnimationPrimary)'
          }
        }
      },
      screens: {
        xs: '480px'
      },
      transformOrigin: {
        node1: '23% 36%',
        node2: '66% 25%',
        node3: '50% 76%',
        node4: '80% 58%'
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