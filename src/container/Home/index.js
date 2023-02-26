import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import NavigationBar from '../../components/common/NavigationBar';
import {hp, isAndroid, normalize, wp} from '../../styles/responsiveScreen';
import Input from '../../components/common/Input';
import {rowData, staticData} from '../../constant/data';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SliderBox} from 'react-native-image-slider-box';
import SvgIcons from '../../assets/svgIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  ADD_TO_WISHLIST,
  ALL_PRODUCT,
  REMOVE_TO_WISHLIST,
} from '../../redux/action.js/home';
import {colors} from '../../assets/colors';

const data = [
  require('../../assets/images/background.png'),
  require('../../assets/images/item1.png'),
  require('../../assets/images/item2.png'),
  require('../../assets/images/item3.png'),
  require('../../assets/images/item4.png'),
];

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selectedBtn, setSelectedBtn] = useState('Vegetables');
  const [selectedItem, setSelectedItem] = useState({});
  const sheetRef = useRef();
  const dispatch = useDispatch();
  const product = useSelector(state => state.HomeReducer);
  const cartProduct = useSelector(state => state.cartReducer);
  const wishlist = useSelector(state => state.wishlistReducer);
  console.log('produt was...........', cartProduct);

  useEffect(() => {
    staticData.map((item, index) =>
      dispatch({type: 'ALL_PRODUCT', payload: item}),
    );
  }, []);

  const onButtonPress = val => {
    setSelectedBtn(val);
  };

  const onAddToCartPress = item => {
    dispatch({type: 'ADD_TO_CART', payload: item});
    dispatch({type: 'INCRESE_QTY', payload: item.id});
  };

  const totalAmount = () => {
    let total = 0;
    cartProduct?.map((item, index) => {
      total = total + item.qty * item.price;
    });
    return total;
  };

  const onWishlistPress = (item, index) => {
    wishlist.includes(item)
      ? dispatch({type: REMOVE_TO_WISHLIST, payload: index})
      : dispatch({type: ADD_TO_WISHLIST, payload: item});
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.gridbox}
        onPress={() => {
          sheetRef.current.open();
          setSelectedItem({item: item, index: index});
        }}>
        <ImageBackground
          source={item.productImg}
          style={{
            width: '100%',
            height: hp(12),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={[
              // styles.iconView,
              // {backgroundColor: '#FFFFFF', margin: wp(2)},
              {margin: wp(2)},
            ]}>
            <SvgIcons.Menu />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onWishlistPress(item, index)}
            style={{margin: wp(2)}}>
            {wishlist.includes(item) ? (
              <SvgIcons.FillFav />
            ) : (
              <SvgIcons.FavIcon />
            )}
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{paddingHorizontal: wp(2), flex: 1, marginVertical: hp(1)}}>
          <Text style={[styles.cardLabel, {flex: 1}]}>{item?.productName}</Text>
          <Text style={styles.cardPrize}>
            {`$${item?.productPrice}`}{' '}
            <Text style={[styles.cardLabel, {color: '#6D6B6B'}]}>
              ({item?.perkg})
            </Text>
          </Text>
          {/* <View style={styles.cardBtnView}>
            <TouchableOpacity style={styles.iconView}>
              <Image
                source={require('../../assets/images/remove_black.png')}
                resizeMode="contain"
                style={{ width: wp(6), height: wp(6) }}
              />
            </TouchableOpacity>
            <Text style={styles.cardLabel}>1</Text>
            <TouchableOpacity style={styles.iconView}>
              <Image
                source={require('../../assets/images/add.png')}
                resizeMode="contain"
                style={{ width: wp(6), height: wp(6) }}
              />
            </TouchableOpacity>
          </View> */}
          {item.qty == 0 ? (
            <TouchableOpacity
              style={[
                styles.followBtn,
                {
                  marginVertical: hp(1),
                  backgroundColor: '#43B028',
                  paddingVertical: wp(3),
                },
              ]}
              onPress={() => {
                onAddToCartPress(item);
              }}>
              <SvgIcons.WhiteAdd />
              <Text
                style={[
                  styles.btnText,
                  {marginLeft: wp(2), fontFamily: 'Poppins-SemiBold'},
                ]}>
                ADD TO CART
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  width: wp(11),
                  height: wp(11),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: wp(6),
                  backgroundColor: '#43B028',
                }}>
                <SvgIcons.WhiteDel />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                  fontSize: normalize(14),
                }}>
                {item.qty}
              </Text>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  width: wp(11),
                  height: wp(11),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: wp(6),
                  backgroundColor: '#43B028',
                }}>
                <SvgIcons.WhiteAdd />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderComponent = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <View>
          <SliderBox
            images={data}
            inactiveDotColor="#FFFFFF"
            dotColor="#43B028"
            paginationBoxVerticalPadding={20}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            disableOnPress
            ImageComponentStyle={{
              height: hp(30),
              width: '100%',
            }}
            dotStyle={{
              width: hp(2),
              height: hp(2),
              borderRadius: hp(1),
              marginHorizontal: wp(1),
            }}
          />
          <TouchableOpacity
            onPress={() => onWishlistPress(item, index)}
            style={{
              width: wp(12),
              height: wp(12),
              backgroundColor: colors.white,
              position: 'absolute',
              bottom: wp(4),
              right: wp(4),
              borderRadius: wp(6),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {wishlist.includes(item) ? (
              <SvgIcons.FillFav width={wp(6.5)} height={wp(6.5)} />
            ) : (
              <SvgIcons.FavIcon width={wp(6.5)} height={wp(6.5)} />
            )}
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            paddingHorizontal: wp(4),
            paddingVertical: wp(5),
            paddingBottom: wp(20),
          }}>
          <Text style={styles.infoLabel}>
            {item?.productName + ' ' + `(${item.minWeight})`}
          </Text>
          <Text style={[styles.modalLabel]}>
            Sold by:{' '}
            <Text
              style={[
                styles.title,
                {color: '#0B0909', textDecorationLine: 'underline'},
              ]}>
              {item?.soldBy}
            </Text>{' '}
          </Text>
          <Text style={[styles.modalLabel]}>
            Status:{' '}
            <Text style={[styles.title, {color: '#43B028'}]}>
              {item?.stock}
            </Text>{' '}
          </Text>
          <Text style={[styles.modalLabel]}>
            Categories:{' '}
            <Text
              style={[
                styles.title,
                {color: '#0B0909', textDecorationLine: 'underline'},
              ]}>
              {item?.categories}
            </Text>{' '}
          </Text>
          <Text style={[styles.infoLabel, {paddingVertical: wp(8)}]}>
            {`$${item?.productPrice}`}
            <Text style={[styles.modalLabel, {color: '#0B0909'}]}>/item</Text>
          </Text>
          <View style={{marginTop: hp(0)}}>
            <View style={{borderBottomWidth: 1, borderColor: '#D7DADCCC'}}>
              <Text style={[styles.cardLabel, styles.line]}>Information</Text>
            </View>
            <Text style={styles.modalLabel}>{item?.desc}</Text>
          </View>
        </ScrollView>
        <View style={styles.modalBottomView}>
          <View>
            <Text style={styles.cardLabel}>{item.qty}</Text>
            <Text style={styles.cardPrize}>{`$${totalAmount()}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('goToCart')}
            style={[
              styles.btnView,
              {
                backgroundColor: '#43B028',
                flexDirection: 'row',
                alignItems: 'center',
              },
            ]}>
            <Text style={styles.btnText}>{'GO TO CART'}</Text>
            <Image
              source={require('../../assets/images/arrow_forward.png')}
              resizeMode="contain"
              style={{width: wp(6), height: wp(6), marginLeft: wp(2)}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={{
          //   flex: 1,
          width: '100%',
          height: wp(85),
        }}
        resizeMode="cover">
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.2)',
            height: wp(85),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: wp(3),

            marginVertical: isAndroid ? wp(0) : wp(6),
          }}>
          <TouchableOpacity style={{width: wp(12)}} onPress={() => {}}>
            <SvgIcons.BackIcon />
          </TouchableOpacity>
          <View style={styles.backContainer}>
            <Image
              source={require('../../assets/images/img.png')}
              resizeMode="contain"
              style={styles.centerImage}
            />
          </View>
          <TouchableOpacity style={styles.followBtn} onPress={() => {}}>
            <SvgIcons.SmallAdd />
            <Text style={styles.btnText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* <NavigationBar
            hasLeft
            hasRight
            hasCenter
            style={{marginHorizontal: wp(2)}}
            borderBottomWidth={0}
            left={
              <TouchableOpacity style={styles.backContainer} onPress={() => {}}>
                <Image
                  source={require('../../assets/images/arrow_back.png')}
                  resizeMode="contain"
                  style={[styles.backbutton, {width: wp(8), height: wp(8)}]}
                />
              </TouchableOpacity>
            }
            center={
              <Image
                source={require('../../assets/images/img.png')}
                resizeMode="contain"
                style={styles.centerImage}
              />
            }
            right={
              <TouchableOpacity style={styles.followBtn} onPress={() => {}}>
                <Image
                  source={require('../../assets/images/add.png')}
                  resizeMode="contain"
                  style={styles.backbutton}
                />
                <Text style={styles.btnText}>Follow</Text>
              </TouchableOpacity>
            }
          /> */}
        <View style={styles.centerContainer}>
          <Text style={styles.title}>{'Harris Farm Markets'}</Text>
          <Text style={styles.simpleText}>{'Castle Hill, Sydney'}</Text>
          <Text
            style={[
              styles.mediumText,
              {textDecorationLine: 'underline', marginTop: wp(2)},
            ]}>
            {'View Info'}
          </Text>
        </View>
        <Input
          withLeftIcon
          leftIcon={
            <TouchableOpacity style={styles.rightIconStyle}>
              <SvgIcons.SearchIcon />
            </TouchableOpacity>
          }
          value={search}
          onChangeText={val => setSearch(val)}
          placeholder={'Search Harris Farm Markets...'}
          autoCapitalize="none"
          inputStyle={{
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            borderColor: '#CECECE',
            borderWidth: 1,
            marginHorizontal: wp(4),
            paddingHorizontal: wp(11),
            marginTop: wp(0),
            fontFamily: 'Poppins-Regular',
            fontSize: normalize(16),
          }}
          color={'black'}
        />
      </ImageBackground>
      <View>
        <ScrollView
          style={{
            marginVertical: wp(2),
            padding: wp(2),
          }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {rowData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onButtonPress(item)}
                activeOpacity={0.7}>
                {selectedBtn === item ? (
                  <LinearGradient
                    angle={155}
                    useAngle
                    colors={['#43B02899', '#FBCE2E']}
                    style={styles.btnView}>
                    <Text
                      style={{
                        fontSize: normalize(16),
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      {item}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.btnView}>
                    <Text
                      style={{
                        fontSize: normalize(16),
                        fontFamily: 'Poppins-SemiBold',
                      }}>
                      {item}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={{marginVertical: wp(0), marginHorizontal: wp(6)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: normalize(24),
              color: 'black',
            }}>
            {selectedBtn}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/filter.png')}
              style={{width: wp(5), height: wp(5)}}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: normalize(16),
                paddingLeft: wp(2),
                color: 'black',
              }}>
              {'Filter and sort'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={{flexGrow: 1, paddingBottom: hp(68)}}
          columnWrapperStyle={{
            justifyContent: 'space-evenly',
          }}
          data={product}
          numColumns={2}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <RBSheet
          ref={sheetRef}
          height={hp(90)}
          openDuration={250}
          customStyles={{
            container: {
              // justifyContent: "center",
              // alignItems: "center",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          }}>
          {renderComponent(selectedItem)}
        </RBSheet>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  backContainer: {width: wp(30), height: wp(28)},
  backbutton: {
    width: wp(7),
    height: wp(7),
    // paddingHorizontal: wp(1.5),
  },
  followBtn: {
    backgroundColor: '#0B0909',
    flexDirection: 'row',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: wp(1.5),
  },
  btnText: {
    fontSize: normalize(13),
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    marginLeft: wp(1),
  },
  centerImage: {
    // width: '100%',
    // height: '100%',
    width: wp(40),
    height: wp(35),
    resizeMode: 'contain',
    // bottom: hp(-3)
  },
  title: {
    fontSize: normalize(16),
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  simpleText: {
    fontSize: normalize(12),
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  mediumText: {
    fontSize: normalize(14),
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: wp(2),
  },
  rightIconStyle: {
    left: wp(8),
    top: wp(9.5),
    zIndex: 1,
  },
  btnView: {
    paddingHorizontal: wp(4),
    shadowOffset: {height: 4, width: 0},
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(7, 6, 6, 0.08);',
    shadowOpacity: 1,
    justifyContent: 'center',
    shadowRadius: 10,
    height: wp(12),
    borderRadius: wp(6),
    // marginRight: wp(4),
  },
  gridbox: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 3,
    margin: hp(0.5),
    shadowColor: 'rgba(7, 6, 6, 0.08)',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  cardLabel: {
    fontSize: normalize(14),
    color: '#0B0909',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  infoLabel: {
    fontSize: normalize(24),
    color: '#0B0909',
    fontFamily: 'Poppins-Bold',

    // fontWeight: '700',
  },
  cardPrize: {
    fontSize: normalize(18),
    color: '#0B0909',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  iconView: {
    backgroundColor: '#43B028',
    width: hp(6),
    height: hp(6),
    borderRadius: hp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBtnView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  modalLabel: {
    fontSize: normalize(16),
    color: '#6D6B6B',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  line: {
    width: wp(24),
    borderColor: '#0B0909',
    borderBottomWidth: 3,
  },
  modalBottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    shadowColor: 'rgba(7, 6, 6, 0.1)',
    shadowOffset: {width: 10, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
});
