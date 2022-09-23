import React, { useEffect } from 'react';

const Location = () => {
  useEffect(() => {
    let map = null;
    const initMap = () => {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.511337, 127.012084),
        zoom: 13,
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
