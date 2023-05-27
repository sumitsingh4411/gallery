import {
  CONSTANT_VALUES,
  FLICKR_API_BASE_URL,
  FLICKR_SERACH_API_BASE_URL,
} from "./constant";

export const getFlickrApiUrl = (page: number, searchText: string) => {
  return (
    (searchText === "" ? FLICKR_API_BASE_URL : FLICKR_SERACH_API_BASE_URL) +
    `&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&format=json&nojsoncallback=1&per_page=10&&page=` +
    page +
    "&text=" +
    searchText
  );
};

export const getImage = (payload: any) => {
  const photos = payload?.photos?.photo;
  const images = photos?.map((photo: any) => {
    const farm = photo.farm;
    const server = photo.server;
    const id = photo.id;
    const secret = photo.secret;
    const title = photo.title;
    const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    return { title, url };
  });
  if (images) {
    return images;
  }
  return [];
};

export const getListOfSearchedTerms = () => {
  const searchedTerms = localStorage.getItem(CONSTANT_VALUES.SEARCHED_TERMS);
  if (searchedTerms) {
    return JSON.parse(searchedTerms);
  }
  return [];
};

export const setValueOfSearchedTerms = (searchedTerms: string) => {
  if (searchedTerms === "") return;
  const searchedTermsList = getListOfSearchedTerms();
  if (searchedTermsList.includes(searchedTerms)) return;
  searchedTermsList.push(searchedTerms);
  localStorage.setItem(
    CONSTANT_VALUES.SEARCHED_TERMS,
    JSON.stringify(searchedTermsList)
  );
};

export const removeValueOfSearchedTerms = () => {
  localStorage.removeItem(CONSTANT_VALUES.SEARCHED_TERMS);
};
