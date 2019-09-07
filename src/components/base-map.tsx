import DeckGL from '@deck.gl/react';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import React, { useState } from 'react';
import { StaticMap } from 'react-map-gl';
import { PUBLIC_MAPBOX_TOKEN } from '../config';

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

  const layers = [
    new EditableGeoJsonLayer({
      data,
      id: 'geojson-layer',
      mode: 'drawPolygon',
      onEdit: ({ updatedData }: any) => setData(updatedData),
      selectedFeatureIndexes: [],
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
