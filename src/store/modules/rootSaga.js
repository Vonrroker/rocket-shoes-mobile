import { all } from 'redux-saga/effects';
import cartSaga from './cart/saga';

export default function* rootSaga() {
  return yield all([cartSaga]);
}
