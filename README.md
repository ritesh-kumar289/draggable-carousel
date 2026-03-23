# Draggable Carousel Project

A beautiful, responsive draggable carousel component built with React and Vite.

## Features

✅ **Draggable/Swipeable Carousel** - Drag to scroll with smooth momentum  
✅ **Touch Support** - Works on mobile devices  
✅ **Navigation Arrows** - Previous/Next buttons  
✅ **Pagination Dots** - Jump to specific cards  
✅ **Snap-to-Card** - Automatically centers on the nearest card  
✅ **Hover Effects** - Image zoom and card elevation on hover  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Smooth Animations** - Professional transitions and easing  

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Build

```bash
npm run build
```

## Project Structure

```
draggable-carousel-project/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── DraggableCarousel.jsx
│   │   └── DraggableCarousel.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## Customization

### Change Number of Cards
Edit `src/components/DraggableCarousel.jsx`:
```jsx
const cardCount = 6; // Change this number
```

### Change Image URL
Edit `src/components/DraggableCarousel.jsx`:
```jsx
const imageUrl = 'YOUR_IMAGE_URL_HERE';
```

### Customize Styling
Edit `src/components/DraggableCarousel.css` to modify colors, sizes, and animations.

## Technologies Used

- React 18
- Vite
- CSS3
- JavaScript ES6+

## License

MIT
