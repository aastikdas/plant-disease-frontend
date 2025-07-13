import React from 'react'

function Navbar() {
  return (
    <div className='bg-blue-200 flex justify-around text-lg font-semibold'>
      <span>Model: EfficientNetB0 + MLP Classifier</span>
      <span> Dataset:  
        <a href="https://www.kaggle.com/datasets/mohitsingh1804/plantvillage" target="_blank" rel="noopener noreferrer"> Plant Village</a>
      </span>
    </div>
  )
}

export default Navbar
