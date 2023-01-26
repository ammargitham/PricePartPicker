/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './build/popup.html'],
  theme: {
    extend: {
      colors: {
        gold: {
          200: '#F0E68C',
          400: '#FFD700',
        },
      },
      backgroundImage: {
        'dropdown-arrow':
          'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2012%207.01%22%3E%3Ctitle%3EAsset%202%3C%2Ftitle%3E%3Cg%20id%3D%22ec081ab4-ee58-4046-8434-7edcf86828ba%22%20data-name%3D%22Layer%202%22%3E%3Cg%20id%3D%22e3178c5e-88be-423b-88f9-da4a5aa5abef%22%20data-name%3D%22Layer%201%22%3E%3Cpath%20d%3D%22M11.88.72l-.6-.6a.38.38%2C0%2C0%2C0-.55%2C0L6%2C4.85%2C1.27.12A.42.42%2C0%2C0%2C0%2C1%2C0%2C.4.4%2C0%2C0%2C0%2C.72.12l-.6.6A.42.42%2C0%2C0%2C0%2C0%2C1a.44.44%2C0%2C0%2C0%2C.12.28l5.6%2C5.61a.39.39%2C0%2C0%2C0%2C.56%2C0l5.6-5.61A.44.44%2C0%2C0%2C0%2C12%2C1a.42.42%2C0%2C0%2C0-.12-.28Z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")',
      },
      animation: {
        overlay: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
