import React, { useEffect, useRef } from "react";
import styles from "./PhotoGallery.module.scss";
import Loader from "../common/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  STATUS,
  selectGallery,
  setPage,
} from "../../redux/slices/gallerySlice";
import { AppDispatch } from "../../redux/store";
import useIntersectionObserver from "../../utils/hooks/useIntersectionObserver";

function PhotoGallery() {
  const dispatch = useDispatch<AppDispatch>();
  const { images, page, status, error } = useSelector(selectGallery);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(loaderRef, status, {});

  useEffect(() => {
    if (!!entry?.isIntersecting && status !== STATUS.LOADING) {
      dispatch(setPage(page + 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  return (
    <div className={styles.photoGallery}>
      <div className={styles.photoGallery__container}>
        {images?.map((photo: any, index: number) => (
          <img
            key={photo.url + index}
            className={styles.photoGallery__image}
            src={photo.url}
            alt={photo.title}
          />
        ))}
      </div>
      <div className={styles.photoGallery__loader}>
        {error ? error : <Loader loaderRef={loaderRef} />}
      </div>
    </div>
  );
}

export default PhotoGallery;
