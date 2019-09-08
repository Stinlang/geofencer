import DeckGL from '@deck.gl/react';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import React, { useEffect, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import { Geometry } from 'wkx';
import { PUBLIC_MAPBOX_TOKEN } from '../config';

interface Pick {
  object: { type: string };
  index: number;
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

const BaseMap = () => {
  const [data, setData] = useState({
    features: [],
    type: 'FeatureCollection',
  });
  const [mode, setMode] = useState<string>('drawPolygon');
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState<
    Array<number>
  >([]);

  const getSelectedGeometry: any = () => {
    const selectedFeature: any = data.features[selectedFeatureIndexes[0]];
    return selectedFeature ? selectedFeature.geometry : null;
  };

  useEffect(() => {
    const geo = getSelectedGeometry();
    if (geo) {
      console.log(geo);
      console.log(Geometry.parseGeoJSON(geo).toWkt());
    }
  }, [selectedFeatureIndexes]);

  class CustomEditableGeoJsonLayer extends EditableGeoJsonLayer {
    constructor(props: any) {
      super(props);
    }

    protected onLayerClick(e: LayerEvent) {
      if (this.isFeaturePicked(e.picks)) {
        const selectedIndexes = e.picks.map(pick => pick.index);
        setSelectedFeatureIndexes(selectedIndexes);
        if (this.props.mode !== 'translate') {
          setMode('translate');
        }
      } else {
        if (selectedFeatureIndexes.length) {
          setSelectedFeatureIndexes([]);
        }
        setMode('drawPolygon');
      }
      super.onLayerClick(e);
    }

    private isFeaturePicked(picks: Array<Pick>) {
      if (!picks.length) {
        return false;
      }
      return picks.filter((pick: Pick) => pick.object.type === 'Feature')
        .length;
    }
  }

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
      mode,
      onEdit: ({ updatedData }: any) => setData(updatedData),
      selectedFeatureIndexes,
    }),
  ];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
    >
      <StaticMap
        mapboxApiAccessToken={PUBLIC_MAPBOX_TOKEN}
        width={0}
        height={0}
      />
    </DeckGL>
  );
};

export default BaseMap;
