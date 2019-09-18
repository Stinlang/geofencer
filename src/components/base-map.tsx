import DeckGL from '@deck.gl/react';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import React, { useCallback, useEffect, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import { connect } from 'react-redux';
import { Geometry } from 'wkx';
import {
  setCursorAction,
  setDrawModeAction,
  setModifyModeAction,
  setSelectedFeatureIndexAction,
  updateDataAction,
} from '../actions/map';
import { PUBLIC_MAPBOX_TOKEN } from '../config';
import { StoreState } from '../reducers';
import { MapState } from '../reducers/map';

interface Props {
  map: MapState;
  setCursor: (cursor: string) => void;
  setSelectedFeatureIndex: (selectedFeatureIndex: number) => void;
}

interface Pick {
  object: { type: string };
  index: number;
}

interface EditEvent {
  updatedData: any;
  editType: string;
}

interface LayerEvent {
  groundCoords: [number, number];
  picks: Array<Pick>;
  screenCoords: [number, number];
}

const initialViewState = {
  bearing: 0,
  latitude: 37.7853,
  longitude: -122.41669,
  pitch: 0,
  zoom: 11,
};

const editModeCursor: { [key: string]: string } = {
  drawPolygon: 'crosshair',
  duplicate: 'copy',
  modify: 'crosshair',
  panning: 'grabbing',
  rotate: 'alias',
  scale: 'nesw-resize',
  translate: 'grab',
};

const BaseMap = ({
  map: { cursor, data, drawMode, modifyMode, selectedFeatureIndex },
  setCursor,
  setDrawMode,
  setModifyMode,
  setSelectedFeatureIndex,
  updateData,
}: any) => {
  const [activeMode, setActiveMode] = useState(drawMode);

  useEffect(() => {
    setActiveMode(selectedFeatureIndex >= 0 ? modifyMode : drawMode);
  }, [drawMode, modifyMode]);

  useEffect(() => {
    console.log(selectedFeatureIndex);
  });

  function handleKeyUp(e: KeyboardEvent) {
    switch (e.key) {
      case 'Escape':
        setSelectedFeatureIndex(-1);
        break;
      case 'Delete':
      case 'Backspace':
        console.log(selectedFeatureIndex);
        if (selectedFeatureIndex >= 0) {
          delete data.features[selectedFeatureIndex];
          const newData = {
            ...data,
            features: data.features.filter(Boolean),
          };
          updateData(newData);
          setSelectedFeatureIndex(-1);
        }
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const setModeCursor = (mode: string) => {
    const cursorType = editModeCursor[mode];
    if (cursorType && cursor !== cursorType) {
      setCursor(cursorType);
    }
  };

  class CustomEditableGeoJsonLayer extends EditableGeoJsonLayer {
    constructor(props: any) {
      super(props);
    }

    protected onLayerClick(event: LayerEvent) {
      if (this.isFeaturePicked(event.picks)) {
        const selectedIndex = event.picks[0].index;
        setSelectedFeatureIndex(selectedIndex);
        setModeCursor(modifyMode);
        setActiveMode(modifyMode);
      } else {
        if (selectedFeatureIndex >= 0) {
          setSelectedFeatureIndex(-1);
        }
        setActiveMode(drawMode);
      }
      super.onLayerClick(event);
    }

    // protected onPointerMove(event: any) {
    //   const { picks, isDragging } = event;
    //   const [pick] = picks;
    //   if (pick) {
    //     if (pick.index === selectedFeatureIndex) {
    //       setModeCursor(modifyMode);
    //     } else {
    //       setCursor('pointer');
    //     }
    //   } else if (!isDragging) {
    //     setModeCursor(drawMode);
    //   }
    //   super.onPointerMove(event);
    // }

    private isFeaturePicked(picks: Array<Pick>) {
      if (!picks.length) {
        return false;
      }
      return picks.filter((pick: Pick) => pick.object.type === 'Feature')
        .length;
    }
  }

  const handleOnEdit = ({ updatedData, editType }: EditEvent) => {
    const editTypeCursor: { [key: string]: string } = {
      translated: 'grab',
      translating: 'grabbing',
    };
    const cursorType = editTypeCursor[editType];
    if (cursorType) {
      setCursor(cursorType);
    }
    updateData(updatedData);
  };

  const layers = [
    new CustomEditableGeoJsonLayer({
      data,
      getFillColor: (_: any, isSelected: boolean) =>
        isSelected ? [255, 0, 0, 150] : [0, 0, 0, 150],
      getLineColor: (_: any, isSelected: boolean) =>
        isSelected ? [200, 0, 0, 255] : [0, 0, 0, 255],
      getLineDashArray: () => [0, 0],
      getTentativeLineColor: () => [10, 0, 0, 200],
      id: 'selected-features-layer',
      mode: activeMode,
      onEdit: handleOnEdit,
      selectedFeatureIndexes:
        selectedFeatureIndex < 0 ? [] : [selectedFeatureIndex],
    }),
  ];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      getCursor={() => cursor}
    >
      <StaticMap
        mapboxApiAccessToken={PUBLIC_MAPBOX_TOKEN}
        width={0}
        height={0}
      />
    </DeckGL>
  );
};

const mapStateToProps = (state: StoreState) => ({ map: state.map });
const mapDispatchToProps = {
  setCursor: setCursorAction,
  setDrawMode: setDrawModeAction,
  setModifyMode: setModifyModeAction,
  setSelectedFeatureIndex: setSelectedFeatureIndexAction,
  updateData: updateDataAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BaseMap);
