import styles from "./Home.module.scss";
import Header from "../common/header/Header";
import PhotoGallery from "../photoGallery/PhotoGallery";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { galleryActions, selectGallery } from "../../redux/slices/gallerySlice";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { page, searchText } = useSelector(selectGallery);

  useEffect(() => {
    const options = { page, searchText };
    dispatch(galleryActions.getImagesList(options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText]);

  return (
    <div className={styles.home}>
      <Header />
      <PhotoGallery />
    </div>
  );
}

export default Home;
