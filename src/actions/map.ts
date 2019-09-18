import { Dispatch } from 'redux';
import { GeoJson } from '../shared/geo-json-types';
import { Thunk } from './index';

export type SetDrawModeAction = {
  type: 'SET_DRAW_MODE';
  payload: { drawMode: string };
};

export type SetModifyModeAction = {
  type: 'SET_MODIFY_MODE';
  payload: { modifyMode: string };
};

export type SetCursorAction = {
  type: 'SET_CURSOR';
  payload: { cursor: string };
};

export type UpdateDataAction = {
  type: 'UPDATE_DATA';
  payload: { data: GeoJson };
};

export type SetSelectedFeatureIndexAction = {
  type: 'SET_SELECTED_FEATURE_INDEX';
  payload: { selectedFeatureIndex: number };
};

export const setDrawModeAction = (drawMode: string): Thunk => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'SET_DRAW_MODE', payload: { drawMode } });
  };
};

export const setModifyModeAction = (modifyMode: string): Thunk => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'SET_MODIFY_MODE', payload: { modifyMode } });
  };
};

export const setCursorAction = (cursor: string): Thunk => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'SET_CURSOR', payload: { cursor } });
  };
};

export const updateDataAction = (data: GeoJson): Thunk => {
  return (dispatch: Dispatch) => {
    dispatch({ type: 'UPDATE_DATA', payload: { data } });
  };
};

export const setSelectedFeatureIndexAction = (
  selectedFeatureIndex: number,
): Thunk => {
  return (dispatch: Dispatch) => {
    dispatch({
      payload: { selectedFeatureIndex },
      type: 'SET_SELECTED_FEATURE_INDEX',
    });
  };
};
