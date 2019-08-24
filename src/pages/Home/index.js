import React, { Component } from 'react';
import { View, Text } from 'react-native';
import api from '../../services/api';

// import { Container } from './styles';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('/products/');

    this.setState({ products: response.data });
  }

  render() {
    const { products } = this.state;

    return (
      <>
        {products.map(product => (
          <View>
            <Text>{product.title}</Text>
            <Text>teste</Text>
          </View>
        ))}
      </>
    );
  }
}
