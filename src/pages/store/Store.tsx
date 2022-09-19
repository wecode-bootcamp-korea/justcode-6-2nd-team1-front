interface StoreProps {
  userInfo: {
    nickname: string;
    token: string;
    userPosition: {
      latitude: number;
      longitude: number;
    };
  };
}

const Store = ({ userInfo: { userPosition } }: StoreProps) => {
  return (
    <div>
      {userPosition.latitude} {userPosition.longitude}
    </div>
  );
};

export default Store;
