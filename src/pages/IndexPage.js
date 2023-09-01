import React, { useState, useEffect } from 'react';
import './styles/Carousel.css';
import NewsCarousel from './CarouselNoticias';

const images = [

  {
    src: 'https://hablemosdeculturas.com/wp-content/uploads/2019/01/mocovies-6.jpg',
    description: 'Descripción de la imagen 2',
  },
  {
    src: 'https://www.ellitoral.com/images/2022/09/28/w-fdhQvna_870x580__1.jpg',
    description: 'Descripción de la imagen 3',
  },
  {
    src: 'https://www.miradorprovincial.com/um/fotos/209093_pueblos_originarios_1024_x_600.jpg',
    description: 'Descripción de la imagen 4',
  },
];

function Carousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="carousel-index">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item-index ${index === currentImage ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image.src})`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <div className="carousel-content">
              <h5>{image.description}</h5>
            </div>
          </div>
        ))}
      </div>
      <NewsCarousel />
    </>
  );
}

export default Carousel;
