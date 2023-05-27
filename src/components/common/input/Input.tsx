import styles from "./Input.module.scss";
import searchIcon from "../../../assets/search.svg";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setSearchText } from "../../../redux/slices/gallerySlice";
import {
  getListOfSearchedTerms,
  removeValueOfSearchedTerms,
  setValueOfSearchedTerms,
} from "../../../utils/functions";

function Input() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeout: any = useRef(null);
  const [checkOnFocus, setCheckOnFocus] = useState(false);

  // Handle search term input with debounce
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setCheckOnFocus(false);
      setValueOfSearchedTerms(value);
      dispatch(setSearchText(value));
    }, 800); // Adjust the debounce delay as needed
  };

  const removeAllSearchedTerms = () => {
    removeValueOfSearchedTerms();
    setCheckOnFocus(false);
  };

  const setValueFromSearchedTerms = (value: string) => {
    setSearchTerm(value);
    dispatch(setSearchText(value));
    setCheckOnFocus(false);
  };
  return (
    <div className={styles.input}>
      <div className={styles.input_container}>
        <input
          className={styles.input__field}
          type="text"
          placeholder="Search free high-resolution photos..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => {
            setCheckOnFocus(true);
          }}
        />
        <img className={styles.input__icon} src={searchIcon} alt="search" />
      </div>
      {checkOnFocus && getListOfSearchedTerms().length > 0 && (
        <div className={styles.input__suggestions}>
          {getListOfSearchedTerms().map((term: string, index: number) => (
            <div
              key={term + index}
              className={styles.input__suggestion}
              onClick={() => {
                setValueFromSearchedTerms(term);
              }}
            >
              {term}
            </div>
          ))}
          <div className={styles.input__suggestion_btn_container}>
            <div
              className={styles.input__suggestion_btn}
              onClick={removeAllSearchedTerms}
            >
              Clear
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Input;
