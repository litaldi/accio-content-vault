
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				slideUp: {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				slideDown: {
					from: {
						opacity: '0',
						transform: 'translateY(-10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				slideRight: {
					from: {
						opacity: '0',
						transform: 'translateX(-10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				slideLeft: {
					from: {
						opacity: '0',
						transform: 'translateX(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				pulse: {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.5'
					}
				},
				shimmer: {
					'0%': {
						backgroundPosition: '-40rem 0'
					},
					'100%': {
						backgroundPosition: '40rem 0'
					}
				},
				spin: {
					from: {
						transform: 'rotate(0deg)'
					},
					to: {
						transform: 'rotate(360deg)'
					}
				},
				scaleIn: {
					from: {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				fadeOut: {
					from: { opacity: '1' },
					to: { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fadeIn 0.5s ease-out forwards',
				'fade-out': 'fadeOut 0.5s ease-out forwards',
				'slide-up': 'slideUp 0.4s ease-out forwards',
				'slide-down': 'slideDown 0.4s ease-out forwards',
				'slide-right': 'slideRight 0.4s ease-out forwards',
				'slide-left': 'slideLeft 0.4s ease-out forwards',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'spin-slow': 'spin 3s linear infinite',
				'scale-in': 'scaleIn 0.2s ease-out forwards'
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
				'width': 'width',
				'max-height': 'max-height'
			},
			fontFamily: {
				sans: [
					'Inter',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
				mono: [
					'SFMono-Regular',
					'Menlo',
					'Monaco',
					'Consolas',
					'"Liberation Mono"',
					'"Courier New"',
					'monospace',
				],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
						color: 'var(--tw-prose-body)',
						a: {
							color: 'var(--tw-prose-links)',
							textDecoration: 'underline',
							fontWeight: '500',
						},
					},
				},
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addBase, theme }) {
			addBase({
				// Improved focus styles
				':focus:not(:focus-visible)': {
					outline: 'none',
				},
				':focus-visible': {
					outline: `2px solid ${theme('colors.primary.DEFAULT')}`,
					outlineOffset: '2px',
				},
				// Improved text rendering
				'html': {
					textRendering: 'optimizeLegibility',
					WebkitFontSmoothing: 'antialiased',
					MozOsxFontSmoothing: 'grayscale',
				},
				// Better a11y defaults
				'[aria-disabled="true"]': {
					cursor: 'not-allowed',
					opacity: '0.7',
				},
				// Skip to content focus styles
				'.skip-to-content:focus': {
					position: 'fixed',
					top: '1rem',
					left: '1rem',
					zIndex: '9999',
					padding: '0.5rem 1rem',
					backgroundColor: theme('colors.background'),
					border: `1px solid ${theme('colors.border')}`,
					borderRadius: theme('borderRadius.md'),
					boxShadow: theme('boxShadow.md'),
				}
			});
		},
	],
} satisfies Config;
