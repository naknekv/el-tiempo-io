import { addPinned, deletePinned } from '../../firebase/firebase.utils';
import {
  CLEAR_PINNED,
  PIN_MUNICIPALITY,
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAILED,
  SIGN_OUT_SUCCESS,
  UNPIN_MUNICIPALITY,
} from './userConstants';

const initialState = {
  currentUser: null,
  pinned: [],
  error: null,
};

export const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        error: null,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case SIGN_IN_FAILED:
    case SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload,
      };
    case PIN_MUNICIPALITY:
      if (state.currentUser) {
        addPinned(payload, state.currentUser.id);
        return state;
      }
      return {
        ...state,
        pinned: [...state.pinned, { ...payload }],
      };
    case UNPIN_MUNICIPALITY:
      if (state.currentUser) {
        deletePinned(payload, state.currentUser.id);
        return state;
      }
      return {
        ...state,
        pinned: state.pinned.filter(
          (mnp) => mnp.municipio.ID_REL !== payload.municipio.ID_REL,
        ),
      };
    case CLEAR_PINNED:
      return {
        ...state,
        pinned: null,
      };
    default:
      return state;
  }
};
