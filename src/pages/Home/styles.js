import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { darken } from 'polished';

export const Container = styled.View`
  background: #191920;
`;

export const ProductList = styled.FlatList.attrs({
  horizontal: true,
})`
  padding: 15px;
`;

export const ProductView = styled.View`
  background: #fff;
  padding: 10px;
  margin-right: 15px;
  border-radius: 4px;
  width: 220px;
`;

export const ImageProduct = styled.Image`
  width: 200px;
  height: 200px;
`;

export const TitleProduct = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const PriceProduct = styled.Text`
  margin-right: 0px;
  padding-left: 10px;
  font-size: 20px;
  margin-top: auto;
  font-weight: bold;
`;

export const AddToCartButton = styled(TouchableOpacity)`
  background: #7159c1;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: 14px;
`;

export const ProductAmount = styled.View`
  padding: 12px;
  background: ${darken(0.03, '#7159c1')};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const ProductAmountText = styled.Text`
  color: #fff;
  margin: 0px 4px 0px 10px;
`;

export const AddText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
`;
