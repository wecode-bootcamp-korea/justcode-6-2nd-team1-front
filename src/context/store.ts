import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { LoginRes, User } from '../interface';

interface UserState extends User {
  isLogin: boolean;
  login: (userInfo: LoginRes) => void;
  logout: () => void;
  isMatch: boolean;
  setIsMatch: (isMatch: boolean, matchStore: string) => void;
  matchStore: string;
}

const useStore = create(
  devtools<UserState>(set => ({
    token: '',
    isLogin: false,
    login(loginRes: LoginRes) {
      set(() => ({ token: loginRes.token, isLogin: true }));
    },
    logout() {
      set(() => ({ token: '', isLogin: false, isMatch: false, matchStore: '' }));
    },
    isMatch: false,
    setIsMatch(isMatch: boolean, matchStore: string) {
      set(() => ({ isMatch, matchStore }));
    },
    matchStore: '',
  }))
);

export default useStore;
