"use client";

const IMAGES = [
  "./demo01.png",
  "./demo02.png",
  "./demo03.png",
  "./demo04.png",
  "./demo05.png",
  "./demo06.png",
  "./demo07.png",
  "./demo08.png",
  "./demo09.png",
];

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TsDemo = () => {
  return (
    <div className="">
      <Carousel showThumbs={false} showStatus={false} showIndicators={false}>
        {IMAGES.map((src, i) => (
          <div key={i}>
            <img src={src} />
            {/* <p>Label</p> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TsDemo;
