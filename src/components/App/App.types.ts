export interface User {
  instagram_username?: string;
  name: string;
}
export interface Urls {
  regular: string;
  small: string;
}
export interface TypeImageCard {
  id: string;
  urls: Urls;
  alt_description: string;
  description: string;
  likes: number;
  user: User;
}

export interface AllImage {
  results: TypeImageCard[];
  total_pages: number;
}
