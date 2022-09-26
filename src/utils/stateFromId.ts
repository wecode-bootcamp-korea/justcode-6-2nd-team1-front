export const stateFromId = (id: number) => {
  switch (id) {
    case 1:
      return '카트 추가';
    case 2:
      return '주문 진행';
    case 3:
      return '결제 완료';
    case 4:
      return '주문 취소';

    default:
      throw new Error('잘못된 아이디');
  }
};
