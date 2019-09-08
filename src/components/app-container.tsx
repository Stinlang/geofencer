import React from 'react';
import styled from 'styled-components';
import BaseMap from './base-map';
import TopNav from './top-nav';

const ScrollableContainer = styled.div`
  overflow: scroll;
`;

const AppContainer = () => (
  <ScrollableContainer>
    <TopNav />
    <BaseMap />
  </ScrollableContainer>
);

export default AppContainer;
