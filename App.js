import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Stacknavigation from './src/navigation/StackNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Stacknavigation />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
