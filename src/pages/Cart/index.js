/* eslint-disable react/prop-types */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';
import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
  TotalAmountView,
} from './styles';
import { formatPrice } from '../../util/format';

function Cart({ products, total, removeFromCart, updateAmountRequest }) {
  function increment(id, amount) {
    updateAmountRequest(id, amount + 1);
  }
  function decrement(id, amount) {
    updateAmountRequest(id, amount - 1);
  }

  return (
    <Container>
      {products.length ? (
        <>
          <Products>
            <FlatList
              data={products}
              keyExtractor={item => String(item.id)}
              ListFooterComponent={() => (
                <TotalContainer>
                  <TotalAmountView>
                    <TotalText>Total</TotalText>
                    <TotalAmount>{total}</TotalAmount>
                  </TotalAmountView>
                  <Order>
                    <OrderText>FINALIZAR PEDIDO</OrderText>
                  </Order>
                </TotalContainer>
              )}
              renderItem={({ item }) => (
                <Product>
                  <ProductInfo>
                    <ProductImage source={{ uri: item.image }} />
                    <ProductDetails>
                      <ProductTitle>{item.title}</ProductTitle>
                      <ProductPrice>{String(item.price)}</ProductPrice>
                    </ProductDetails>
                    <ProductDelete onPress={() => removeFromCart(item.id)}>
                      <Icon name="delete-forever" size={24} color="#7159c1" />
                    </ProductDelete>
                  </ProductInfo>
                  <ProductControls>
                    <ProductControlButton
                      onPress={() => decrement(item.id, item.amount)}
                    >
                      <Icon
                        name="remove-circle-outline"
                        size={20}
                        color="#7159c1"
                      />
                    </ProductControlButton>
                    <ProductAmount value={String(item.amount)} />
                    <ProductControlButton
                      onPress={() => increment(item.id, item.amount)}
                    >
                      <Icon
                        name="add-circle-outline"
                        size={20}
                        color="#7159c1"
                      />
                    </ProductControlButton>
                    <ProductSubtotal>{String(item.subTotal)}</ProductSubtotal>
                  </ProductControls>
                </Product>
              )}
            />
          </Products>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" size={64} color="#eee" />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
}

const mapStateToProps = state => ({
  products: state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.amount * product.price),
  })),
  total: formatPrice(
    state.cart.reduce(
      (totalSum, product) => totalSum + product.price * product.amount,
      0
    )
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
