import axios from "axios";
import { TypeImageCard } from "../components/App/App.types";

axios.defaults.baseURL = "https://api.unsplash.com/";

const API_KEY = "Client-ID QGPN2fVjQ-k0DNYrM7pyjEuxgmI9R74BeIdz0ljU_Fk";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

axios.defaults.params = {
  orientation: "landscape",
  per_page: 15,
};

export interface Data {
  results: TypeImageCard[];
  total: number;
  total_pages: number;
}

export const getPhotos = async (query: string, page: number): Promise<Data> => {
  const { data } = await axios.get(`/search/photos`, {
    params: {
      query: query,
      page: page,
    },
  });

  return data;
};
