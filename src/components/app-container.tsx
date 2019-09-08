import React from 'react';
import styled from 'styled-components';
import BaseMap from './base-map';

const ScrollableContainer = styled.div`
  overflow: scroll;
`;

const AppContainer = () => (
  <ScrollableContainer>
    <BaseMap />
  </ScrollableContainer>
);

export default AppContainer;
