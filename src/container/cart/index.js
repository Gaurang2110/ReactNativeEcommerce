import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {hp, normalize, wp} from '../../styles/responsiveScreen';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import CartView from './cartView';
import PastOrder from './pastOrder';

const Cart = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Cart'},
    {key: 'second', title: 'Past Order'},
  ]);
  const renderScene = SceneMap({
    first: CartView,
    second: PastOrder,
  });

  const renderLabel = ({route, focused}) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: wp(6),
        width: '100%',
        paddingVertical: wp(2),
        // backgroundColor: focused ? '#2994FF' : 'transparent',
        borderRadius: wp(10),
      }}>
      <Text
        numberOfLines={1}
        style={{
          fontFamily: focused ? 'Poppins-Regular' : 'Poppins-Regular',
          color: focused ? '#000000' : '#BEBEBE',
          fontSize: normalize(14),
        }}>
        {route.title}
      </Text>
    </TouchableOpacity>
  );

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: 'black',
        width: '45%',
        alignSelf: 'center',
        alignItems: 'center',
        marginLeft: wp(2),
      }}
      style={{
        backgroundColor: 'white',
        shadowOffset: {height: 4, width: 0},
        shadowColor: '#000000',
        shadowOpacity: 1,
        elevation: 20,
        // marginLeft: wp(5),
      }}
      renderLabel={renderLabel}
    />
    // <TabBar
    //   {...props}
    //   indicatorStyle={{backgroundColor: 'black'}}
    //   style={{backgroundColor: 'white'}}
    // />
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          flex: 1,
          width: wp(100),
          height: wp(30),
          paddingTop: wp(6),
          //   backgroundColor: 'red',
        }}>
        <Image
          source={require('../../assets/images/drawer.png')}
          style={{width: wp(8), height: wp(8), marginLeft: wp(4)}}
        />
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{
            shadowOffset: {height: 10, width: 0},
            shadowRadius: 1,
            shadowOpacity: 1,
            shadowColor: '#000000',
            backgroundColor: '#FFFFFF',
            elevation: 2,
          }}
          renderTabBar={renderTabBar}
          //   initialLayout={{ width: layout.width }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
