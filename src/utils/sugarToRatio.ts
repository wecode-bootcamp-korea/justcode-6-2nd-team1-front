type Sugar = 0 | 30 | 50 | 70 | 100;

export const sugarToRatio = (sugar: Sugar) => {
  switch (sugar) {
    case 0:
      return 1;
    case 30:
      return 2;
    case 50:
      return 3;
    case 70:
      return 4;
    case 100:
      return 5;
  }
};
