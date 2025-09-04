/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Notion 风格的颜色系统
      colors: {
        // 主要颜色
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // 背景颜色
        background: {
          primary: '#ffffff',
          secondary: '#f7f6f3',
          tertiary: '#f1f1ef',
          hover: '#f5f5f4',
          selected: '#e9e9e7',
        },
        // 文本颜色
        text: {
          primary: '#37352f',
          secondary: '#6f6e69',
          tertiary: '#9b9a97',
          muted: '#b8b7b4',
          white: '#ffffff',
        },
        // 边框颜色
        border: {
          light: '#e9e9e7',
          medium: '#d3d2ce',
          dark: '#b8b7b4',
        },
        // 状态颜色 (Notion 风格)
        status: {
          // 红色系
          red: {
            light: '#ffeaea',
            medium: '#ffdbdb',
            dark: '#e03e3e',
            text: '#d44c47',
          },
          // 橙色系
          orange: {
            light: '#faebdd',
            medium: '#f5d5ae',
            dark: '#d9730d',
            text: '#cb912f',
          },
          // 黄色系
          yellow: {
            light: '#fbf3db',
            medium: '#f7e8b4',
            dark: '#dfab01',
            text: '#d89e00',
          },
          // 绿色系
          green: {
            light: '#ddedea',
            medium: '#b4d6cd',
            dark: '#0f7b6c',
            text: '#448361',
          },
          // 蓝色系
          blue: {
            light: '#ddebf1',
            medium: '#b7d1e0',
            dark: '#0b6e99',
            text: '#337ea9',
          },
          // 紫色系
          purple: {
            light: '#eae4f2',
            medium: '#d0bfdc',
            dark: '#6940a5',
            text: '#9065b0',
          },
          // 粉色系
          pink: {
            light: '#f4dfeb',
            medium: '#e8b3d1',
            dark: '#ad1a72',
            text: '#c14c8a',
          },
          // 灰色系
          gray: {
            light: '#ebeced',
            medium: '#d1d5d9',
            dark: '#6b7280',
            text: '#787774',
          },
        },
        // 卡片和组件颜色
        card: {
          background: '#ffffff',
          hover: '#f8f8f7',
          border: '#e9e9e7',
          shadow: 'rgba(15, 15, 15, 0.05)',
        },
        // 侧边栏颜色
        sidebar: {
          background: '#f7f6f3',
          hover: '#f1f1ef',
          active: '#e9e9e7',
          text: '#37352f',
          textMuted: '#6f6e69',
        },
      },

      // 字体系统
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Helvetica',
          '"Apple Color Emoji"',
          'Arial',
          'sans-serif',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
        mono: [
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          '"PT Mono"',
          '"Liberation Mono"',
          'Courier',
          'monospace',
        ],
      },

      // 字体大小
      fontSize: {
        xs: ['11px', { lineHeight: '16px' }],
        sm: ['12px', { lineHeight: '18px' }],
        base: ['14px', { lineHeight: '20px' }],
        lg: ['16px', { lineHeight: '24px' }],
        xl: ['18px', { lineHeight: '28px' }],
        '2xl': ['20px', { lineHeight: '28px' }],
        '3xl': ['24px', { lineHeight: '32px' }],
        '4xl': ['32px', { lineHeight: '40px' }],
      },

      // 间距系统
      spacing: {
        0.5: '2px',
        1.5: '6px',
        2.5: '10px',
        3.5: '14px',
        4.5: '18px',
        5.5: '22px',
        6.5: '26px',
        7.5: '30px',
        8.5: '34px',
        9.5: '38px',
        13: '52px',
        15: '60px',
        17: '68px',
        18: '72px',
        19: '76px',
        21: '84px',
        22: '88px',
        23: '92px',
        25: '100px',
        26: '104px',
        28: '112px',
        30: '120px',
        32: '128px',
        36: '144px',
        40: '160px',
        44: '176px',
        48: '192px',
        52: '208px',
        56: '224px',
        60: '240px',
        64: '256px',
        72: '288px',
        80: '320px',
        96: '384px',
      },

      // 圆角
      borderRadius: {
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        '2xl': '12px',
        '3xl': '16px',
      },

      // 阴影
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
        // Notion 特殊阴影
        card: '0 1px 3px rgba(15, 15, 15, 0.1)',
        'card-hover': '0 2px 8px rgba(15, 15, 15, 0.15)',
        sidebar: 'inset -1px 0 0 rgba(55, 53, 47, 0.16)',
      },

      // 动画和过渡
      transitionDuration: {
        150: '150ms',
        250: '250ms',
        350: '350ms',
      },

      transitionTimingFunction: {
        notion: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      // 自定义动画
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // 网格和布局
      gridTemplateColumns: {
        kanban: 'repeat(auto-fit, minmax(280px, 1fr))',
        sidebar: '240px 1fr',
        main: '1fr',
      },

      // 最大宽度
      maxWidth: {
        sidebar: '240px',
        content: '1200px',
        card: '320px',
      },

      // 最小高度
      minHeight: {
        card: '120px',
        column: '400px',
      },

      // Z-index 层级
      zIndex: {
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        'modal-backdrop': '1040',
        modal: '1050',
        popover: '1060',
        tooltip: '1070',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
