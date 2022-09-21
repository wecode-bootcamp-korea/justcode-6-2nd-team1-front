export interface Notice {
  id: number;
  date: string;
  title: string;
}

export interface User {
  nickname: string;
  token: string;
}

export interface ProductInfo {
  id: number;
  beverageName: string;
  imageURL: string;
  price: number;
}
