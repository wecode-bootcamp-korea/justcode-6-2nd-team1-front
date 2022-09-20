import React, { useState } from "react";

const Store = () => {
  const [selectedOption, setSelectedOption] = useState();
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption;
  };
  const addresses = [
    "시,도",
    "서울특별시",
    "부산광역시",
    "대구광역시",
    "인천광역시",
    "경기도",
  ];

  return (
    <div>
      <div>
        <h1>STORE</h1>
        <p>간편하게 공차의 매장을 검색해보세요.</p>
      </div>
      <div>
        <select>
          {/* {addresses.map((address) => {
            <option key={address} value={address}>
              {address}
            </option>;
          })} */}
          <option>시/도</option>
          <option>경기도</option>
          <option>서울</option>
        </select>
      </div>
      <div>
        <select>
          <option>구/군</option>
          <option>경기도</option>
          <option>서울</option>
        </select>
      </div>
      <div>
        <input placeholder="매장명 또는 주소를 입력해 주세요"></input>
        <button>돋보기</button>
      </div>
      <div>
        <ul>
          <li>수원태장점</li>
          <li>수원태장점</li>
          <li>수원태장점</li>
          <li>수원태장점</li>
        </ul>
      </div>
    </div>
  );
};

export default Store;
