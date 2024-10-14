import ImageCard from "../ImageCard/ImageCard";
import { TypeImageCard } from "../App/App.types";
import { RefObject } from "react";

import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: TypeImageCard[];
  onImageClick: (imageData: TypeImageCard) => void;
  lastPicture: RefObject<HTMLLIElement>;
}

export default function ImageGallery({
  images,
  onImageClick,
  lastPicture,
}: ImageGalleryProps): JSX.Element {
  return (
    <div>
      <ul className={css.container}>
        {images.map(
          (
            {
              id,
              urls: { regular, small },
              alt_description,
              likes,
              user: { name },
            },
            index
          ) => {
            const isLast = index === images.length - 1;
            return (
              <li
                key={`${id}-${index}`}
                ref={isLast ? lastPicture : null}
                className={css.wrap}
              >
                <ImageCard
                  src={small}
                  alt={alt_description}
                  onClick={() =>
                    onImageClick({
                      id,
                      urls: { regular, small },
                      alt_description,
                      description: "",
                      likes,
                      user: { name },
                    })
                  }
                />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
