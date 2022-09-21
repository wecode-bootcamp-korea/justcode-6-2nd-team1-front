import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '../interface';

interface UserState extends User {
  isLogin: boolean;
  login: (userInfo: User) => void;
}

const useStore = create(
  devtools<UserState>(set => ({
    nickname: '처음이름',
    token: '',
    isLogin: false,
    login(loginRes: User) {
      set(state => ({ ...loginRes, isLogin: true }));
    },
  }))
);

export default useStore;
