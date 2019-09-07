import DeckGL from '@deck.gl/react';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import React, { Component } from 'react';
import { StaticMap } from 'react-map-gl';
import { PUBLIC_MAPBOX_TOKEN } from '../config';

const initialViewState = {
  bearing: 0,
  latitude: 37.7853,
  longitude: -122.41669,
  pitch: 0,
  zoom: 11,
};

class BaseMap extends Component<any, any> {
  private layers = [
    new EditableGeoJsonLayer({
      id: 'geojson-layer',
      mode: 'drawPolygon',
    }),
  ];
  public render() {
    return (
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={this.layers}
      >
        <StaticMap
          mapboxApiAccessToken={PUBLIC_MAPBOX_TOKEN}
          width={0}
          height={0}
        />
      </DeckGL>
    );
  }
}

export default BaseMap;
