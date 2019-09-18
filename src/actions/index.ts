import { Dispatch } from 'redux';
import {
  SetCursorAction,
  SetDrawModeAction,
  SetModifyModeAction,
  SetSelectedFeatureIndexAction,
  UpdateDataAction,
} from './map';

type ActionType =
  | SetDrawModeAction
  | SetCursorAction
  | SetModifyModeAction
  | SetSelectedFeatureIndexAction
  | UpdateDataAction;

export type Thunk = (dispatch: Dispatch) => void;

export default ActionType;
