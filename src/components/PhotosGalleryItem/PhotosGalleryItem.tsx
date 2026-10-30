import type { Photo } from "../../types/photo";
import GridItem from "../GridItem/GridItem";

import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProps {
  item: Photo;
  onPhotoClick: (photo: Photo) => void;
}

export default function PhotosGalleryItem({
  item,
  onPhotoClick,
}: PhotosGalleryItemProps) {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{
          backgroundColor: item.avg_color,
          borderColor: item.avg_color,
        }}
      >
        <img
          src={item.src.original}
          alt={item.alt}
          onClick={() => onPhotoClick(item)}
        />
      </div>
    </GridItem>
  );
}
