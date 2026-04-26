/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space:    ['Space Grotesk', 'sans-serif'],
        inter:    ['Inter', 'sans-serif'],
      },
      animation: {
        marquee:    'marquee 55s linear infinite',
        float:      'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'spin-slow':  'spin 28s linear infinite',
        'ping-slow':  'ping 3.5s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        /* Refined glow pulse — very gentle, long cycle */
        glowPulse: {
          '0%,100%': {
            textShadow: '0 0 20px rgba(255,255,255,0.18), 0 0 50px rgba(255,255,255,0.05)',
          },
          '50%': {
            textShadow: '0 0 32px rgba(255,255,255,0.35), 0 0 80px rgba(255,255,255,0.10)',
          },
        },
      },
    },
  },
  plugins: [],
}
