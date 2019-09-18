import React from 'react';
import styled from 'styled-components';
import BaseMap from './base-map';
import IconPanel from './icon-panel';
import TopNav from './top-nav';

const ScrollableContainer = styled.div`
  overflow: scroll;
`;

const AppContainer = () => (
  <ScrollableContainer>
    <TopNav />
    <IconPanel />
    <BaseMap />
  </ScrollableContainer>
);

export default AppContainer;
