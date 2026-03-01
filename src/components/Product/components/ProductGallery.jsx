import { useState } from "react";
import styles from "./ProductGallery.module.css";


export const ProductGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const normalizeImage = (img) => {
    const raw = img?.image || img;
    if (!raw) return "";
    return raw.startsWith("http") ? raw : `${API_URL}${raw}`;
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!images.length) {
    return <div className={styles.empty}>No images</div>;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <img
          src={normalizeImage(images[currentIndex])}
          alt={`${title} - Image ${currentIndex + 1}`}
          className={styles.mainImage}
        />

        {images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.prevArrow}`}
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              className={`${styles.arrow} ${styles.nextArrow}`}
              onClick={goToNext}
              aria-label="Next image"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((img, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${
                index === currentIndex ? styles.active : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img src={normalizeImage(img)} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
