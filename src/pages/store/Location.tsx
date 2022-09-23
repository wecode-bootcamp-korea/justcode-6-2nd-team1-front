import React, { useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Location = () => {
  useEffect(() => {
    let map = null;
    const initMap = () => {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.511337, 127.012084),
        zoom: 13,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37, 127.039573), //Marker 추가, 좌표에 마커가 찍힌다.
        map: map,
        icon: {
          content: `<img alt="marker" src={FaMapMarkerAlt} />`,
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
