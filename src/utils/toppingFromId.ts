export const toppingFromId = (id: number) => {
  switch (id) {
    case 1:
      return '펄';
    case 2:
      return '화이트펄';
    case 3:
      return '알로에';
    case 4:
      return '코코넛';
    case 5:
      return '밀크폼';
    case 6:
      return '치즈폼';
    default:
      return '잘못된 id입니다';
  }
};
