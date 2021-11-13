import { StatusBar, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import store from '../../app/store'

import {
  BACKGROUND_WHITE_COLOR,
  BACKGROUND_COLOR
} from '../../constants';

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
