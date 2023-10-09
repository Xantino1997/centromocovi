import React, { useState } from 'react';
import './styles/NewsCarousel.css';
import noticiaComunidad1 from "../assets/noticiaComunidad1.png";
import noticiaComunidad2 from "../assets/noticiaComunidad2.png";
import noticiaComunidad3 from "../assets/noticiaComunidad3.png";
import noticiaComunidad4 from "../assets/noticiaComunidad4.png";

const news = [
    {
        id: 1,
        title: 'Noticia 1',
        image: noticiaComunidad1,
        link: '/noticias/noticia1',
    },
    {
        id: 2,
        title: 'Noticia 2',
        image: noticiaComunidad2,
        link: '/noticias/noticia2',
    },
    {
        id: 3,
        title: 'Noticia 3',
        image: noticiaComunidad3,
        link: '/noticias/noticia3',
    },
    {
        id: 4,
        title: 'Noticia 4',
        image: noticiaComunidad4,
        link: '/noticias/noticia4',
    },
    // Agrega más noticias aquí...
];

function NewsCarousel() {
    const [startIndex, setStartIndex] = useState(0);

    const handlePrevSlide = () => {
        setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    const handleNextSlide = () => {
        setStartIndex((prevIndex) => Math.min(news.length - 3, prevIndex + 1));
    };

    const visibleNews = news.slice(startIndex, startIndex + 3);

    return (
        <div className="news-carousel">
            <h2 className='titulo-noticias'>Noticias Recientes</h2>
            <h4 className='subtitulo-noticias'>El conococimiento es un tesoro divino que alumbra las sendas de la vida, cuanto mas luz arroja conocer las raices y el desarrollo de nuestra propia cultura mostrando la vida de la comunidad Mocovi</h4>
            <div className="carousel-noticias">
                <div className="carousel-slide">
                    {visibleNews.map((item) => (
                        <div key={item.id} className="news-item">
                            <img className="news-item-img" src={item.image} alt={item.title} />
                            <div className="item-title">
                                <h2>{item.title}</h2>
                                <a className='link-more' href={item.link}>Leer más</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="carousel-navigation">
                <button className="prev-button" onClick={handlePrevSlide}>
                    &lt;
                </button>
                <button className="next-button" onClick={handleNextSlide}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default NewsCarousel;
