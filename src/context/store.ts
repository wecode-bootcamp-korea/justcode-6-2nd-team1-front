import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { LoginRes, User } from '../interface';

interface UserState extends User {
  isLogin: boolean;
  login: (userInfo: LoginRes) => void;
  logout: () => void;
}

const useStore = create(
  devtools<UserState>(set => ({
    token: '',
    isLogin: false,
    login(loginRes: LoginRes) {
      set(() => ({ token: loginRes.token, isLogin: true }));
    },
    logout() {
      set(() => ({ token: '', isLogin: false }));

      localStorage.removeItem('email');
      localStorage.removeItem('password');
    },
  }))
);

export default useStore;
