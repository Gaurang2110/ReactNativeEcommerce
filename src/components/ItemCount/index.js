import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SvgIcons from '../../assets/svgIcons';
import {normalize, wp} from '../../styles/responsiveScreen';
import {colors} from '../../assets/colors';
import {globalStyle} from '../../styles/globleStyle';

const ItemCount = ({qty, onDelPress, onMinusPress, onAddPress}) => {
  return (
    <View style={globalStyle.rowJB}>
      <TouchableOpacity
        onPress={() => {
          qty === 1 ? onDelPress() : onMinusPress();
        }}
        style={styles.circleView}>
        {qty === 1 ? <SvgIcons.WhiteDel /> : <SvgIcons.Minus />}
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: 'black',
          fontSize: normalize(14),
          paddingHorizontal: wp(4),
        }}>
        {qty}
      </Text>
      <TouchableOpacity onPress={() => onAddPress()} style={styles.circleView}>
        <SvgIcons.WhiteAdd />
      </TouchableOpacity>
    </View>
  );
};

export default ItemCount;

const styles = StyleSheet.create({
  circleView: {
    width: wp(11),
    height: wp(11),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(6),
    backgroundColor: colors.lightGreen,
  },
});
