export interface Notice {
  id: number;
  date: string;
  title: string;
}

export interface User {
  token: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  token: string;
  message: string;
}

export interface ProductInfo {
  id: number;
  beverage_name: string;
  beverage_image: string;
  price: string;
}

export interface CategoryRes {
  beverageData: ProductInfo[];
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

export interface OrderReq {
  amount: number;
  cold: number;
  totalPrice: number;
  takeOut: number;
  sugar: number;
  ice: 'regular' | 'less' | 'full';
  toppings: {
    id: number;
    amount: number;
  }[];
}

export interface OrderRes {
  orderData: {
    orderId: number;
    userName: string;
    phone_number: string;
    shopName: string;
    address: string;
    take_out: number;
    point: number;
    beverage_name: string;
    beverage_image: string;
    price: string;
    amount: number;
    cold: number;
    sugar: number;
    ice: 'regular' | 'less' | 'full';
    toppingData?: {
      amount: number;
      topping_id: number;
    }[];
    total_price: string;
  };
}

export interface AgreeListProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface Review {
  id: number;
  nickname: string;
  content: string;
  score: number;
  created_at: string;
}

export interface ReviewRes {
  reviewData: Review[];
}

export interface CreateReviewReq {
  content: string;
}

export interface CreateReviewRes {
  message: string;
}
export interface SignUp {
  email: string;
  password: string;
  nickname: string;
  name: string;
  phoneNumber: string;
}

export interface SignUpReq {
  email: string;
  password: string;
  nickname: string;
  name: string;
  phoneNumber: string;
}

export interface AddCartReq {
  amount: number;
  cold: number;
  totalPrice: number;
  takeOut: number;
  sugar: number;
  ice: 'regular' | 'less' | 'full';
  toppings: {
    id: number;
    amount: number;
  }[];
}

export interface AddCartRes {
  message: string;
}

export interface AmountOption {
  name: string;
  price: string;
  amount: number;
  minusHandler: () => void;
  plusHandler: () => void;
}

export interface CartItem {
  shopName: string;
  orderId: number;
  beverage_image: string;
  beverage_name: string;
  price: string;
  orderAmount: number;
  cold: number;
  sugar: 0 | 30 | 50 | 70 | 100;
  ice: 'regular' | 'less' | 'full';
  toppingData: {
    amount: number;
    topping_id: number;
  }[];
}

export interface GetCartRes {
  cartData: CartItem[];
}

export interface OrderData {
  userName: string;
  phone_number: string;
  shopName: string;
  address: string;
  take_out: number;
  point: number;
  totalPrice: number;
  beverageData: Beverage[];
}

export interface Beverage {
<<<<<<< HEAD
  id: number;
=======
  orderId: number;
>>>>>>> main
  beverage_name: string;
  beverage_image: string;
  price: string;
  amount: number;
  cold: number;
  sugar: number;
  ice: 'regular' | 'less' | 'full';
  toppingData: {
    amount: 1;
    topping_id: 4;
  }[];
}

export interface CartOrderRes {
  orderData: OrderData;
}

export type CartPayReq = {
  id: number;
}[];

export interface OrderHistory {
  orderId: number;
  beverage_name: string;
  beverage_image: string;
  amount: number;
  total_price: string;
  order_status_id: number;
  cold: number;
  sugar: number;
  ice: 'regular' | 'less' | 'full';
  toppings: {
    amount: number;
    topping_id: number;
  }[];
}
