import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import toast, { Toaster } from "react-hot-toast";
// import { useEffect } from "react";
import { getPhotos } from "../../services/photos";
import { useState } from "react";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import type { Photo } from "../../types/photo";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import Text from "../Text/Text";

export default function App() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   const getResponse = async () => {
  //     const response = await getPhotos("cat");
  //     console.log(response);
  //   };

  //   getResponse();
  // }, []);

  const handleSubmit = async (value: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getPhotos(value);

      if (response.length === 0) {
        toast.error("Try another query.");
        setPhotos(null);
        return;
      }

      setPhotos(response);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoClick = (photo: Photo | null) => {
    setSelectedPhoto(photo);
  };

  return (
    <>
      <Section>
        <Container>
          <Toaster />
          <Form onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {isError && <Text>Something went wrong, try again later!</Text>}
          {photos && photos.length > 0 && (
            <PhotosGallery photos={photos} onPhotoClick={handlePhotoClick} />
          )}
          {selectedPhoto && (
            <Modal onClose={() => handlePhotoClick(null)}>
              <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
            </Modal>
          )}
        </Container>
      </Section>
    </>
  );
}
