import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setModifyModeAction } from '../actions/map';
import { StoreState } from '../reducers';

interface Props {
  setModifyMode: (modifyMode: string) => void;
}

const IconPanelContainer = styled.div`
  position: fixed;
  left: 0;
  top: 70px;
  z-index: 10;
  width: 60px;
  border: 1px solid red;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const IconSpacing = styled.div`
  margin: 5px 0;
`;

// TODO: pointer icon @ top

const modifyButtons = {
  duplicate: 'Duplicate',
  rotate: 'Rotate',
  scale: 'Scale',
  translate: 'Move',
};

const drawButtons = {
  drawPolygon: 'Draw Polygon',
};

const renderIconButton = (setModifyMode: (mode: string) => void) => {
  return (buttonInfo: Array<string>) => {
    const [editMode, label] = buttonInfo;
    return (
      <IconSpacing key={editMode}>
        <button onClick={() => setModifyMode(editMode)}>{label}</button>
      </IconSpacing>
    );
  };
};

const IconPanel = ({ setModifyMode }: Props) => {
  return (
    <IconPanelContainer>
      <FlexColumn>
        {Object.entries(modifyButtons).map(renderIconButton(setModifyMode))}
      </FlexColumn>
    </IconPanelContainer>
  );
};

const mapStateToProps = (state: StoreState) => ({ map: state.map });
const mapDispatchToProps = {
  setModifyMode: setModifyModeAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IconPanel);
