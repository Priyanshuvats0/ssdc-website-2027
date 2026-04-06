import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel() {
  const images = [
    "https://picsum.photos/id/1018/600/400",
    "https://picsum.photos/id/1025/600/400",
    "https://picsum.photos/id/1035/600/400",
    "https://picsum.photos/id/1042/600/400",
    "https://picsum.photos/id/1050/600/400",
    "https://picsum.photos/id/1062/600/400",
  ];

  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isAnimating, setIsAnimating] = useState(true);
  const timerRef = useRef(null);

  const gap = 16;
  const total = images.length;
  const extendedImages = [...images, ...images];

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      const w = containerRef.current.offsetWidth;
      setSlideWidth((w - gap * (itemsPerView - 1)) / itemsPerView);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [itemsPerView]);

  
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    startTimer();
  };

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
    resetTimer();
  };

  const prevSlide = () => {
    setIndex((prev) => prev - 1);
    resetTimer();
  };


  useEffect(() => {
    if (index >= total) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(index % total);
      }, 700);
    }
    if (index < 0) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(total - 1);
      }, 700);
    }
  }, [index, total]);

  useEffect(() => {
    if (!isAnimating) {
      requestAnimationFrame(() => setIsAnimating(true));
    }
  }, [isAnimating]);

  const translateX = -(index * (slideWidth + gap));

  return (
    <div id="gallery" className="w-full flex justify-center items-center border-b-2">
      <div className="relative w-full max-w-6xl mx-auto overflow-hidden mt-10 pb-12">
      
        <div
          ref={containerRef}
          className={`flex ${
            isAnimating ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{
            transform: `translateX(${translateX}px)`,
            gap: `${gap}px`,
          }}
        >
          {extendedImages.map((src, i) => (
            <div
              key={i}
              style={{ width: `${slideWidth}px`, flex: "0 0 auto" }}
              className="flex-shrink-0"
            >
              <img
                src={src}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl"
                alt={`slide-${i}`}
              />
            </div>
          ))}
        </div>

    
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-blue-500 transition"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

      
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-blue-500 transition"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
