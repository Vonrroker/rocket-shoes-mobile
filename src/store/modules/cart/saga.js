import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';
import {
  addToCartSuccess,
  updateAmountSuccess,
  updateAmountRequest,
} from './actions';
import { formatPrice } from '../../../util/format';
import NavigationService from '../../../services/NavigationService';

function* addTocart({ id }) {
  const productExist = yield select(state => state.cart.find(p => p.id === id));

  if (productExist) {
    yield put(updateAmountRequest(id, productExist.amount + 1));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      formatedPrice: formatPrice(response.data.price),
      amount: 1,
    };

    yield put(addToCartSuccess(data));

    NavigationService.navigate('Cart');
  }
}

function* updateAmount({ id, amount }) {
  const { data } = yield call(api.get, `/stock/${id}`);

  if (amount <= 0) {
    return;
  }

  if (amount > data.amount) {
    Alert.alert('Quantidade indisponível em estoque');
  } else {
    yield put(updateAmountSuccess(id, amount));
  }
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addTocart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
