import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export default function PhotosGallery({
  photos,
  onPhotoClick,
}: PhotosGalleryProps) {
  return (
    <Grid>
      {photos.map((item) => (
        <PhotosGalleryItem
          key={item.id}
          item={item}
          onPhotoClick={onPhotoClick}
        />
      ))}
    </Grid>
  );
}
