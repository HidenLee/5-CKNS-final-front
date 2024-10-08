import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import homeIcon from '../../images/footer/home.png';
import airplaneIcon from '../../images/footer/airplane.png';
import scheduleIcon from '../../images/footer/schedule.png';
import mapIcon from '../../images/footer/map.png';

const BottomNav = () => {
  const location = useLocation(); // 현재 경로를 가져옴

  return (
    <NavContainer>
      <NavItem href="/" isActive={location.pathname === '/'}>
        <NavIcon src={homeIcon} alt="메인" />
        <NavText isActive={location.pathname === '/'}>메인</NavText>
      </NavItem>
      <NavItem href="/search" isActive={location.pathname === '/search'}>
        <NavIcon src={airplaneIcon} alt="검색" />
        <NavText isActive={location.pathname === '/search'}>검색</NavText>
      </NavItem>
      <NavItem href="/schedule" isActive={location.pathname === '/schedule'}>
        <NavIcon src={scheduleIcon} alt="일정" />
        <NavText isActive={location.pathname === '/schedule'}>일정</NavText>
      </NavItem>
      <NavItem href="/map" isActive={location.pathname === '/map'}>
        <NavIcon src={mapIcon} alt="지도" />
        <NavText isActive={location.pathname === '/map'}>지도</NavText>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNav;

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ddd;
  z-index: 1000;
`;

const NavItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#007bff' : '#000')}; 
  transition: transform 0.2s, color 0.2s;

  &:active {
    transform: scale(1.1); 
  }
`;

const NavIcon = styled.img`
  width: 23px;
  height: 23px;
  margin-bottom: 5px;
  filter: ${({ isActive }) => (isActive ? 'invert(50%) sepia(100%) saturate(500%) hue-rotate(200deg)' : 'none')}; 
`;

const NavText = styled.span`
  font-size: 12px;
  color: ${({ isActive }) => (isActive ? '#007bff' : '#000')}; /* 활성화된 아이템의 텍스트 색상 변경 */
`;
