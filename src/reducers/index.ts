import { combineReducers } from 'redux';
import map, { MapState } from './map';

export interface StoreState {
  map: MapState;
}

export default combineReducers({ map });
