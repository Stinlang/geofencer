import React from 'react';
import styled from 'styled-components';
import GithubIcon from './icons/github';

const TopNavContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
  width: 100vw;
  top: 0;
  height: 60px;
  background-color: #1c2230;
`;

const Logo = styled.a`
  color: white;
  text-decoration: none;
  font-size: 30px;
  padding: 10px 0;
  margin: 0 100px;
`;

const GithubIconStyle = styled.a`
  margin: 5px 50px 0 0;
`;

const TopNav = () => (
  <TopNavContainer>
    <Logo href="/">Geofencer</Logo>
    <GithubIconStyle href="https://github.com/Stinlang/geofencer">
      <GithubIcon size="40" />
    </GithubIconStyle>
  </TopNavContainer>
);

export default TopNav;
