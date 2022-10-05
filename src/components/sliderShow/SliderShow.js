
import React, { useState, useRef, useEffect } from "react";
import "./sliderShow.css"

function Slideshow({ sliderShows }) {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    let sliders = [];

    sliderShows.forEach((slider) => {
        sliders = [...sliders, slider.sliderShow]
    });

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === sliderShows.length - 1 ? 0 : prevIndex + 1
                ), 5000
        );
        return () => {
            resetTimeout();
        };
    }, [sliderShows, index]);

    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {sliders.map((backgroundColor, index) => (
                    <img key={index}
                        className="slide"
                        src={backgroundColor} alt=""
                    />
                ))}

            </div>

            <div className="slideshowDots">
                {sliders.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>

        </div>
    );
}

export default Slideshow;
