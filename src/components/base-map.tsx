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
  const [cursor, setCursor] = useState<string>('all-scroll');
  const [mode, setMode] = useState<string>('drawPolygon');
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState<
    Array<number>
  >([]);

  useEffect(() => {
    const selectedFeature: any = data.features[selectedFeatureIndexes[0]];
    const geo = selectedFeature ? selectedFeature.geometry : null;
    if (geo) {
      console.log(geo);
      console.log(Geometry.parseGeoJSON(geo).toWkt());
    }
  }, [selectedFeatureIndexes, data.features]);

  class CustomEditableGeoJsonLayer extends EditableGeoJsonLayer {
    constructor(props: any) {
      super(props);
    }

    protected onLayerClick(event: LayerEvent) {
      if (this.isFeaturePicked(event.picks)) {
        const selectedIndexes = event.picks.map(pick => pick.index);
        setSelectedFeatureIndexes(selectedIndexes);
        setCursor('all-scroll');
        if (this.props.mode !== 'translate') {
          setMode('translate');
        }
      } else {
        if (selectedFeatureIndexes.length) {
          setSelectedFeatureIndexes([]);
        }
        setMode('drawPolygon');
      }
      super.onLayerClick(event);
    }

    protected onPointerMove(event: any) {
      const { picks } = event;
      const [pick] = picks;
      if (pick && pick.index === selectedFeatureIndexes[0]) {
        setCursor('all-scroll');
      } else {
        setCursor('grab');
      }
      super.onPointerMove(event);
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

export default BaseMap;
