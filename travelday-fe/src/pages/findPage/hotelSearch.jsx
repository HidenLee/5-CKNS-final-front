import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import AreaPopup from '../../components/shared/areaPopup';
import DateRangePopup from '../../components/shared/datePopup';
import HoteLlist from '../../components/findPage/hoteLlist';
import useHotelStore from '../../store/useHotelStore'; // 올바른 스토어 가져오기

const HotelSearch = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // 여기서 사용할 목데이터
  const locations = [
    '서울, 대한민국',
    '부산, 대한민국',
    '인천, 대한민국',
    '대구, 대한민국',
    '뉴욕, 미국',
    '파리, 프랑스',
    '도쿄, 일본',
    '런던, 영국',
  ];

  const {
    location,
    dates,
    setLocation,
    setDates,
  } = useHotelStore();

  const navigate = useNavigate();

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSearchInput('');
    setFilteredResults([]);
  };

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const results = locations.filter(location => location.includes(searchInput));
      setFilteredResults(results.length > 0 ? results : ['검색결과가 없습니다.']);
    }
  };

  const handleResultClick = (result) => {
    if (result !== '검색결과가 없습니다.') {
      setSelectedLocation(result); // 지역 선택
      handlePopupClose();
      setTimeout(() => {
        setIsDatePopupOpen(true); // 날짜 선택 팝업 열기
      }, 300);
    }
  };

  const handleDateSelect = (range) => {
    setDates(range); // 선택된 날짜를 Zustand 스토어에 저장
  };

  const handleSearchClick = () => {
    setLocation(selectedLocation); // 선택된 지역을 Zustand 스토어에 저장
    console.log("선택된 지역:", selectedLocation);
    console.log("선택된 날짜:", dates);

    navigate('/hotel'); // /hotel 페이지로 이동
  };

  const handleDatePopupClose = () => {
    setIsDatePopupOpen(false);
  };

  // 예시 호텔 데이터
  const hotels = [
    { image: '', name: 'Hilton New York', location: 'New York, USA', rating: '5 stars', price: '1,500,000원' },
    { image: '', name: 'Hotel de Paris', location: 'Paris, France', rating: '5 stars', price: '2,000,000원' },
    { image: '', name: 'Tokyo Inn', location: 'Tokyo, Japan', rating: '3 stars', price: '800,000원' },
  ];

  return (
    <Container>
      <AreaSearchingContainer>
        <ButtonContainer>
          <Button onClick={handleButtonClick}>도시, 호텔 이름을 검색하세요.</Button>
        </ButtonContainer>
      </AreaSearchingContainer>
      <AnimatedPopup 
        isOpen={isPopupOpen} 
        onClose={handlePopupClose} 
        searchResults={filteredResults}
        onResultClick={handleResultClick} 
      >
        <input 
          type="text" 
          placeholder="도시, 호텔 위치를 검색하세요." 
          value={searchInput}
          onChange={handleSearchInputChange} 
          onKeyDown={handleKeyDown} // 
        />
      </AnimatedPopup>
      <DateRangePopup 
        isOpen={isDatePopupOpen} 
        onClose={handleDatePopupClose}
        onDateRangeChange={handleDateSelect}
        onSearchClick={handleSearchClick} 
        buttonText="검색"
        dateRange={dates} 
      />
      <HoteLlist hotels={hotels} />
    </Container>
  );
};

export default HotelSearch;


// Styled Components remain the same

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 327px;
  height: 64px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 30px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 0 40px;
  cursor: pointer;
  background-color: #fff;
  border: none;
  outline: none;
  font-size: 16px;
  color: #CCC;
`;

const AreaSearchingContainer = styled.div`
  width: 390px;
  display: flex;
  align-items: center;
  background-color: #fff;
  justify-content: center;
`;

const AnimatedPopup = styled(AreaPopup)`
  animation: ${slideUp} 0.3s ease-out;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;

  ${(props) => !props.isOpen && `
    display: none;
  `}
`;
