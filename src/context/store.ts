import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '../interface';

interface UserState extends User {
  isLogin: boolean;
  login: (userInfo: User) => void;
  logout: () => void;
}

const useStore = create(
  devtools<UserState>(set => ({
    token: 'asd',
    isLogin: true,
    login(loginRes: User) {
      set(() => ({ ...loginRes, isLogin: true }));
    },
    logout() {
      set(() => ({ token: '', isLogin: false }));
    },
  }))
);

export default useStore;
