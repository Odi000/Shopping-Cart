import Slider from "react-slick";
import styles from "../css-modules/carousel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function CarouselItem({ product }) {
    return (
        <div className={styles.slide}>
            <img src={product.image} />
            <h2 className={styles.name}>{product.name}</h2>
        </div>
    )
}

export default function Carousel({ products, loading }) {
    if (loading) return '';

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    const idToPickUp = ["124", "120", "112", "108", "126", "132", "149", "135"];
    const showCaseProducts = products.filter(product => idToPickUp.includes(product.id));

    return (
        <div className={styles.carousel}>
            <Slider {...settings}>
                {
                    showCaseProducts.map(product => {
                        return (
                            <div key={product.id} className={styles.slideContainer}>
                                <CarouselItem product={product}></CarouselItem>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}
