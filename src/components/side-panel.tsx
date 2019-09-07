import React from 'react';
import styled from 'styled-components';

const SidePanelContainer = styled.div`
  width: 200px;
  height: 500px;
  background-color: green;
  position: fixed;
  right: 0;
  z-index: 10;
`;

const SidePanel = () => <SidePanelContainer>This is a test</SidePanelContainer>;

export default SidePanel;
