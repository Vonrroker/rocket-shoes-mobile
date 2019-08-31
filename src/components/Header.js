import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  ViewHeader,
  LogoImage,
  CartHeader,
  ItemCount,
} from './styles';

function Header({ navigation, cartSize }) {
  return (
    <Container>
      <ViewHeader>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <LogoImage />
        </TouchableOpacity>
        <CartHeader onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>{cartSize}</ItemCount>
        </CartHeader>
      </ViewHeader>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
