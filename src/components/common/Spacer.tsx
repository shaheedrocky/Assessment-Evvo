import {View, Text} from 'react-native';
import React from 'react';

interface SpacerProps {
  height: number;
}

const Spacer = ({height}: SpacerProps) => {
  return <View style={{height: height}} />;
};

export default Spacer;
