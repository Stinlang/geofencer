import ActionType from '../actions';
import { GeoJson } from '../shared/geo-json-types';

export interface MapState {
  cursor: string;
  modifyMode: string;
  drawMode: string;
  data: GeoJson;
  selectedFeatureIndex: number;
}

const INITIAL_STATE = {
  cursor: 'grab',
  data: {
    features: [],
    type: 'FeatureCollection',
  },
  drawMode: 'drawPolygon',
  modifyMode: 'translate',
  selectedFeatureIndex: -1,
};

export default (state: MapState = INITIAL_STATE, action: ActionType) => {
  switch (action.type) {
    case 'SET_DRAW_MODE':
      const { drawMode } = action.payload;
      return { ...state, drawMode };
    case 'SET_MODIFY_MODE':
      const { modifyMode } = action.payload;
      return { ...state, modifyMode };
    case 'SET_CURSOR':
      const { cursor } = action.payload;
      return { ...state, cursor };
    case 'UPDATE_DATA':
      const { data } = action.payload;
      return { ...state, data };
    case 'SET_SELECTED_FEATURE_INDEX':
      const { selectedFeatureIndex } = action.payload;
      return { ...state, selectedFeatureIndex };
    default:
      return state;
  }
};
