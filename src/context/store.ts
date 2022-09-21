import create from 'zustand';
import { User } from '../interface';

interface UserInfo extends User {
  isLogin: boolean;
  login: (userInfo: User) => void;
}

const useStore = create<UserInfo>(set => ({
  nickname: '처음이름',
  token: '',
  isLogin: false,
  login(loginRes: User) {
    set(state => ({ ...loginRes, isLogin: true }));
  },
}));

export default useStore;
