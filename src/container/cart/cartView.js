import {
  StyleSheet,
  Text,
  View,
  Image,
  SectionList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {normalize, wp} from '../../styles/responsiveScreen';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../assets/colors';
import SvgIcons from '../../assets/svgIcons';
import ItemCount from '../../components/ItemCount';

const CartView = () => {
  const [listData, setListData] = useState([]);
  const dispatch = useDispatch();
  const cartData = useSelector(state => state.cartReducer);
  useEffect(() => {
    let result = cartData.map((item, index) => {
      const data = {soldBy: item.soldBy, data: item};
      return data;
    });

    const out = result.reduce((a, v) => {
      if (a[v.soldBy]) {
        a[v.soldBy].data = [a[v.soldBy].data, v.data];
      } else {
        a[v.soldBy] = v;
      }
      return a;
    }, {});

    // let result = cartData.reduce(function (accObj, currentObj) {
    //   accObj[currentObj.soldBy] = accObj[currentObj.soldBy] || [];
    //   accObj[currentObj.soldBy].push(currentObj);
    //   return accObj;
    // }, {});

    // const result = Object.values(
    //   cartData.reduce((acc, item) => {
    //     acc[item.soldBy]
    //       ? (acc[item.soldBy].data = [...item])
    //       : (acc[item.soldBy] = {
    //           soldBy: item.soldBy,
    //           data: item,
    //         });
    //     return acc;
    //   }, {}),
    // );

    setListData(Object.values(out));

    console.log(
      'new cart data was.........',
      JSON.stringify(Object.values(out)),
    );
  }, []);

  const getSum = () => {
    let total = 0;

    cartData.map((item, index) => {
      total = total + item.productPrice * item.qty;
    });

    return total;
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: wp(4),
          paddingVertical: wp(6),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: normalize(24),
            fontFamily: 'Poppins-Bold',
            color: '#000000',
          }}>
          {'My Cart'}
        </Text>
        <Text
          style={{
            fontSize: normalize(16),
            fontFamily: 'Poppins-Regular',
            color: '#43B028',
          }}>
          {'Clear All'}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{paddingHorizontal: wp(4)}}>
        {listData?.map((item, index) => {
          return (
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // alignItems: 'center',
                }}>
                <View
                  style={{
                    width: wp(12),
                    height: wp(12),
                    borderRadius: wp(6),
                    backgroundColor: 'white',
                    elevation: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/img.png')}
                    style={{width: wp(12), height: wp(12)}}
                    resizeMode={'contain'}
                  />
                </View>
                <View style={{flex: 0.9}}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: 'black',
                      fontSize: normalize(18),
                    }}>
                    {item?.soldBy}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: normalize(12),
                      color: 'black',
                    }}>
                    {'Delivery fee: $1.00'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: normalize(18),
                    alignSelf: 'flex-end',
                    color: 'black',
                  }}>
                  {'$5.00'}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                  paddingVertical: wp(2),
                }}>
                ADD <Text style={{color: colors.lightGreen}}> $14.50</Text> FOR
                FREE DELIVERY
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  width: wp(100),
                  alignSelf: 'center',
                  borderColor: colors.borderColor,
                }}
              />
              {item.data.length > 0 ? (
                item.data.map((e, id) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: wp(4),
                    }}>
                    <Image
                      source={e.productImg}
                      style={{width: wp(12), height: wp(12)}}
                    />
                    <View style={{flex: 0.8}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold',
                          color: colors.black,
                          fontSize: normalize(14),
                        }}>{`$${e.productPrice}`}</Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: colors.black,
                          fontSize: normalize(12),
                        }}>{`${e.productName},${e.minWeight}`}</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <SvgIcons.EditIcon />
                        <Text
                          style={{
                            fontFamily: 'Poppins-Regular',
                            fontSize: normalize(14),
                            color: colors.lightGrey,
                          }}>
                          {'Preferences'}
                        </Text>
                      </View>
                    </View>
                    <ItemCount
                      onMinusPress={() =>
                        dispatch({type: 'REMOVE_TO_CART', payload: e})
                      }
                      onDelPress={() =>
                        dispatch({type: 'DELETE_TO_CART', payload: e.id})
                      }
                      onAddPress={() =>
                        dispatch({type: 'ADD_TO_CART', payload: e})
                      }
                      qty={e.qty}
                    />
                  </View>
                ))
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: wp(4),
                  }}>
                  <Image
                    source={item.data.productImg}
                    style={{width: wp(12), height: wp(12)}}
                  />
                  <View style={{flex: 0.8}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        color: colors.black,
                        fontSize: normalize(14),
                      }}>{`$${item.data.productPrice}`}</Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: colors.black,
                        fontSize: normalize(12),
                      }}>{`${item.data.productName},${item.data.minWeight}`}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <SvgIcons.EditIcon />
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: normalize(14),
                          color: colors.lightGrey,
                        }}>
                        {'Preferences'}
                      </Text>
                    </View>
                  </View>
                  <ItemCount
                    onMinusPress={() =>
                      dispatch({type: 'REMOVE_TO_CART', payload: item.data})
                    }
                    onDelPress={() =>
                      dispatch({type: 'DELETE_TO_CART', payload: item.data.id})
                    }
                    onAddPress={() =>
                      dispatch({type: 'ADD_TO_CART', payload: item.data})
                    }
                    qty={item.data.qty}
                  />
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: wp(6),
          paddingHorizontal: wp(4),
        }}>
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: normalize(14),
              color: colors.black,
            }}>{`${cartData.length} items`}</Text>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: colors.black,
              fontSize: normalize(14),
            }}>{`$${getSum()}`}</Text>
        </View>
        <TouchableOpacity
          style={{
            width: wp(70),
            paddingVertical: wp(4),
            alignItems: 'center',
            backgroundColor: colors.lightGreen,
            borderRadius: wp(10),
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: normalize(14),
              color: colors.white,
              paddingRight: wp(2),
            }}>
            {'CONFIRM'}
          </Text>
          <SvgIcons.NextIcon height={wp(3.5)} width={wp(3.5)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartView;

const styles = StyleSheet.create({});
