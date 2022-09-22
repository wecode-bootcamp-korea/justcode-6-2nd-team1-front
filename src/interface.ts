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

export interface ProductOption {
  isIce: boolean;
  amount: number;
  isTakeout: boolean;
  isJumbo: boolean;
  sugar: 0 | 30 | 50 | 70 | 100;
  iceSize: 'regular' | 'less' | 'full';
  additionalOption: {
    pearl: number;
    whitePearl: number;
    aloe: number;
    coconut: number;
    milkform: number;
    cheeseform: number;
  };
}
