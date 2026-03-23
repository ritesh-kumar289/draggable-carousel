import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import './DraggableCarousel.css'

const DraggableCarousel = () => {
  const carouselRef = useRef(null)
  
  const items = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    image: 'https://www.offfinds.com/cdn/shop/files/10.webp?v=6117008433173782667'
  }))

  return (
    <div className="carousel-container">
      <h1>Draggable Carousel</h1>
      <p className="carousel-subtitle">Drag the cards to scroll</p>
      
      <div className="carousel-wrapper" ref={carouselRef}>
        <motion.div
          className="carousel"
          drag="x"
          dragConstraints={carouselRef}
          dragElastic={0.2}
          dragMomentum={true}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="carousel-card"
              whileHover={{ y: -15, boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>Beautiful product showcase</p>
                <button className="card-button">View Details</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default DraggableCarousel
