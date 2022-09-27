const orderStateFromId = (id: number) => {
  switch (id) {
    case 0:
      return '주문 취소';
    default:
      return '잘못된 상태입니다.';
  }
};

export default orderStateFromId;
