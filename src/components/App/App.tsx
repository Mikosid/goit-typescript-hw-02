import { getPhotos } from "../../apiService/photos";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

import { useEffect, useState, useRef } from "react";

import { AllImage, TypeImageCard } from "./App.types";

import "./App.module.css";

export default function App(): JSX.Element {
  const [query, setQuery] = useState<string>("");

  const [page, setPage] = useState<number>(1);

  const [images, setImages] = useState<TypeImageCard[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<TypeImageCard | null>(
    null
  );

  const lastPicture = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages }: AllImage = await getPhotos(query, page);
        if (!results.length) {
          return setIsEmpty(true);
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < total_pages);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const openModal = (imageData: TypeImageCard) => {
    if (isModalOpen) return;
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const onHandleSubmit = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setIsVisible(false);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          onImageClick={openModal}
          lastPicture={lastPicture}
        />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageData={selectedImage}
      />
      {!images.length && !isEmpty && (
        <ErrorMessage textAlign="center">Let`s begin search 🔎</ErrorMessage>
      )}
      {isLoading && <Loader />}
      {error && (
        <ErrorMessage textAlign="center">
          ❌ Something went wrong - {error}
        </ErrorMessage>
      )}
      {isEmpty && (
        <ErrorMessage textAlign="center">
          Sorry. There are no images ... 😭
        </ErrorMessage>
      )}
      {images.length > 0 && isVisible && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
