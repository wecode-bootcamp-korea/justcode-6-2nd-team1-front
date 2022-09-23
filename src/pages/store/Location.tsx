import React, { useEffect } from 'react';

interface LocationDefaultType {
  lat: number;
  lng: number;
}
const Location = ({ lat, lng }: LocationDefaultType) => {
  useEffect(() => {
    let navermap = null;
    const initMap = () => {
      const navermap = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 13,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng), //Marker 추가, 좌표에 마커가 찍힌다.
        map: navermap,
        icon: {
          url: `<img alt="marker" src={vectorIcon} />`,
        },
      });
    };
    initMap();
  }, []);

  return (
    <div>
      <div id='map' style={{ width: '100%', height: '200px' }}></div>
    </div>
  );
};

export default Location;
