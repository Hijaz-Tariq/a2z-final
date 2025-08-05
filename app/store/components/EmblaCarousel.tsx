import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Product } from '@prisma/client';
import { ProductGridCard } from './GridCard';
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'

type EmblaCarouselProps = {
  slides: Product[] | number[];
  isProductCarousel?: boolean;
  options?: EmblaOptionsType;
};

// type PropType = {
//   slides: number[]
//   options?: EmblaOptionsType
// }

const EmblaCarousel: React.FC<EmblaCarouselProps> = (EmblaCarouselProps) => {
  const { slides, isProductCarousel = false} = EmblaCarouselProps
  // const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // Essential for continuous looping
    align: 'center', // Better looping behavior
    skipSnaps: true // Smother transitions
  });
  const autoplayInterval = 5000;

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      emblaApi.scrollNext();
    };

    const interval = setInterval(autoplay, autoplayInterval);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <section className="embla text-black">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {/* {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))} */}

          {isProductCarousel ? (
            (slides as Product[]).map((product) => (
              <div className="embla__slide" key={product.id}>
                <ProductGridCard product={product} />
              </div>
            ))
          ) : (
            (slides as number[]).map((_, index) => (
              <div className="embla__slide" key={index}>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            ))
          )}

        </div>
      </div>

      {/* Side navigation buttons */}
      <div className="embla__side-buttons">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="embla__button embla__button--prev"
        />
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="embla__button embla__button--next"
        />
      </div>

      {/* Dots navigation */}
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
          />
        ))}
      </div>
    </section>
  )
}
export default EmblaCarousel


///////////////////////////////////////////////////////////////////// 14: 42

// components/EmblaCarousel.tsx
// "use client";

// import React from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import { Product } from '@prisma/client';
// import { ProductGridCard } from './GridCard'; // Using your existing GridCard
// import { EmblaOptionsType } from 'embla-carousel'
// type EmblaCarouselProps = {
//   slides: Product[] | number[];
//   isProductCarousel?: boolean;
//   options?: EmblaOptionsType;
// };

// export function EmblaCarousel({ slides, isProductCarousel = false, options }: EmblaCarouselProps) {
//   const [emblaRef] = useEmblaCarousel(options);

//   return (
//     <div className="embla" ref={emblaRef}>
//       <div className="embla__container">
//         {isProductCarousel ? (
//           (slides as Product[]).map((product) => (
//             <div className="embla__slide" key={product.id}>
//               <ProductGridCard product={product} />
//             </div>
//           ))
//         ) : (
//           (slides as number[]).map((_, index) => (
//             <div className="embla__slide" key={index}>
//               <div className="h-64 bg-gray-200 rounded-lg"></div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }