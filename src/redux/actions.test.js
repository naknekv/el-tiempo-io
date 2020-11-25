import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import { setRequestMunicipalities } from './actions';
import { REQUEST_MUNICIPALITIES_PENDING } from './constants';

const mockStore = configureStore([thunkMiddleware]);

describe('setRequestMunicipalities', () => {
  const store = mockStore();

  it('handles requesting municipalities from API', async () => {
    await store.dispatch(setRequestMunicipalities());
    const actions = store.getActions();

    const expectedAction = {
      type: REQUEST_MUNICIPALITIES_PENDING,
    };
    expect(actions[0]).toEqual(expectedAction);
  });
});
