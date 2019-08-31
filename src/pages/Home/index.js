import React, { Component } from 'react';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { bindActionCreators } from 'redux';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  ProductList,
  ImageProduct,
  TitleProduct,
  PriceProduct,
  AddToCartButton,
  ProductView,
  AddText,
  ProductAmount,
  ProductAmountText,
} from './styles';
import { formatPrice } from '../../util/format';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products/');

    const data = response.data.map(product => ({
      ...product,
      formatedPrice: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddCart = id => {
    // eslint-disable-next-line react/prop-types
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    // eslint-disable-next-line react/prop-types
    const { cartAmounts } = this.props;

    return (
      <Container>
        <ProductList
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ProductView>
              <ImageProduct source={{ uri: item.image }} />
              <TitleProduct>{item.title}</TitleProduct>
              <PriceProduct>{String(item.formatedPrice)}</PriceProduct>
              <AddToCartButton onPress={() => this.handleAddCart(item.id)}>
                <ProductAmount>
                  <Icon name="add-shopping-cart" color="#FFF" size={20} />
                  <ProductAmountText>
                    {String(cartAmounts[item.id] || 0)}
                  </ProductAmountText>
                </ProductAmount>
                <AddText>ADICIONAR</AddText>
              </AddToCartButton>
            </ProductView>
          )}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cartAmounts: state.cart.reduce((amounts, product) => {
    // eslint-disable-next-line no-param-reassign
    amounts[product.id] = product.amount;
    return amounts;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
