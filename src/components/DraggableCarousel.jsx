import React from 'react';
import { motion } from 'framer-motion';

const DraggableCarousel = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    return (
        <div className='carousel'>
            <motion.div 
                className='carousel-inner' 
                drag='x' 
                dragConstraints={{ left: -100, right: 100 }} 
                whileDrag={{ cursor: 'grabbing' }}
            >
                {items.map((item, index) => (
                    <motion.div key={index} className='carousel-item'>
                        {item}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default DraggableCarousel;