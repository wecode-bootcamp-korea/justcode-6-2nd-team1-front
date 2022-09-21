export interface Notice {
  id: number;
  date: string;
  title: string;
}

export interface User {
  token: string;
}

export interface ProductInfo {
  id: number;
  beverageName: string;
  imageURL: string;
  price: string;
}

export interface ProductDetailInfo {
  detailData: {
    id: number;
    beverageName: string;
    imageURL: string;
    price: string;
    description: string;
    shopName: null;
    nutrition_data: {
      fat: number;
      kcal: number;
      sugar: number;
      sodium: number;
      caffein: number;
      protein: number;
    };
    review_data: {
      id: number;
      content: string;
      nickname: string;
      createdAt: string;
    }[];
  };
}
