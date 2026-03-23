import React, { useRef, useLayoutEffect, useCallback, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import './DraggableCarousel.css'

const CARD_WIDTH = 300
const CARD_GAP = 24
const CARD_STEP = CARD_WIDTH + CARD_GAP
const DEFAULT_CONTAINER_WIDTH = 1000

const ITEMS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  image: 'https://www.offfinds.com/cdn/shop/files/10.webp?v=6117008433173782667',
}))

function CarouselSlide({ item, trackX, cardCenterOffset, containerCenter }) {
  const distFromCenter = useTransform(
    trackX,
    (x) => x + cardCenterOffset - containerCenter
  )

  const rotateY = useTransform(distFromCenter, [-600, -300, 0, 300, 600], [45, 22, 0, -22, -45])
  const scale = useTransform(distFromCenter, [-400, -200, 0, 200, 400], [0.7, 0.85, 1.0, 0.85, 0.7])
  const opacity = useTransform(distFromCenter, [-400, -200, 0, 200, 400], [0.4, 0.75, 1.0, 0.75, 0.4])
  const z = useTransform(distFromCenter, [-400, 0, 400], [-150, 0, -150])

  return (
    <motion.div
      className="carousel-card"
      style={{ rotateY, scale, opacity, z }}
    >
      <div className="card-image">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="card-content">
        <h3>{item.title}</h3>
        <p>Beautiful product showcase</p>
        <button className="card-button">View Details</button>
      </div>
    </motion.div>
  )
}

const DraggableCarousel = () => {
  const containerRef = useRef(null)
  const [containerCenter, setContainerCenter] = useState(0)
  const trackX = useMotionValue(0)

  const getContainerWidth = useCallback(() => {
    return containerRef.current ? containerRef.current.offsetWidth : DEFAULT_CONTAINER_WIDTH
  }, [])

  const getSnapX = useCallback(
    (index) => {
      const width = getContainerWidth()
      return width / 2 - (index * CARD_STEP + CARD_WIDTH / 2)
    },
    [getContainerWidth]
  )

  useLayoutEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      setContainerCenter(width / 2)
      trackX.set(width / 2 - CARD_WIDTH / 2)
    }
    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [trackX])

  const handleDragEnd = useCallback(
    (_, info) => {
      const x = trackX.get()
      const velocity = info.velocity.x
      const projected = x + velocity * 0.05
      const width = getContainerWidth()
      const rawIndex = (width / 2 - CARD_WIDTH / 2 - projected) / CARD_STEP
      const nearestIndex = Math.max(0, Math.min(ITEMS.length - 1, Math.round(rawIndex)))
      animate(trackX, getSnapX(nearestIndex), {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1,
      })
    },
    [trackX, getSnapX, getContainerWidth]
  )

  const dragConstraints = {
    right: containerCenter - CARD_WIDTH / 2,
    left: containerCenter - ((ITEMS.length - 1) * CARD_STEP + CARD_WIDTH / 2),
  }

  return (
    <div className="carousel-container">
      <h1>Draggable Carousel</h1>
      <p className="carousel-subtitle">Drag the cards to scroll</p>

      <div className="carousel-viewport" ref={containerRef}>
        <motion.div
          className="carousel-track"
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x: trackX, cursor: 'grab' }}
          whileDrag={{ cursor: 'grabbing' }}
        >
          {ITEMS.map((item, index) => (
            <CarouselSlide
              key={item.id}
              item={item}
              trackX={trackX}
              cardCenterOffset={index * CARD_STEP + CARD_WIDTH / 2}
              containerCenter={containerCenter}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default DraggableCarousel
