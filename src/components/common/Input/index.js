import React, {
  createRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  findNodeHandle,
  TouchableOpacity,
} from 'react-native';
import {hp, isiPAD, normalize, wp} from '../../../styles/responsiveScreen';

const Input = forwardRef(
  (
    {
      value,
      editable,
      height,
      fontSize,
      fontName,
      color,
      placeholder,
      placeholderTextColor,
      blurOnSubmit,
      returnKeyType,
      multiline,
      multilineHeight,
      keyboardType,
      autoCapitalize,
      maxLength,
      secureTextEntry,
      inputStyle,
      children,
      style,
      onFocus,
      onBlur,
      autoFocus,
      textAlign,
      caretHidden,
      contextMenuHidden,
      selectTextOnFocus,
      pointerEvents,
      onSubmit,
      clearOnSubmit,
      willCheckPosition,
      checkPosition,
      onChangeText,
      onEndEditing,
      onKeyPress,
      autoCorrect,
      scrollEnabled,
      onContentSizeChange,
      withRightIcon,
      rightIcon,
      withLeftIcon,
      leftIcon,
      eye,
      checkEye,
    },
    ref,
  ) => {
    const [inputValue, setValue] = useState(value);

    let inputRef = createRef();

    const onChangeTextHandler = text => {
      setValue(text);
      if (typeof onChangeText === 'function') {
        onChangeText(text);
      }
    };

    const onSubmitEditingHandler = () => {
      if (typeof onSubmit === 'function') {
        onSubmit(inputValue);
      }
      if (clearOnSubmit) {
        setValue('');
      }
    };

    const onFocusHandler = () => {
      if (typeof onFocus === 'function') {
        onFocus();
      }
      if (willCheckPosition && typeof checkPosition === 'function') {
        checkPosition(findNodeHandle(inputRef));
      }
    };

    const _inputStyle = {
      height: multiline ? multilineHeight : height,
    };

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.focus(),
      blur: () => inputRef.blur(),
      disable: () => setEditable(false),
      enable: () => setEditable(true),
    }));

    return (
      <View style={[eye || children ? styles.wrapper : styles.wrapper2, style]}>
        {withLeftIcon ? leftIcon : null}
        <TextInput
          ref={el => {
            inputRef = el;
          }}
          textContentType="none"
          pointerEvents={pointerEvents}
          editable={editable}
          value={value}
          textAlign={textAlign}
          autoCompleteType="off"
          allowFontScaling={false}
          placeholder={placeholder}
          placeholderTextColor={'#9D9D9D'}
          onChangeText={onChangeTextHandler}
          onSubmitEditing={onSubmitEditingHandler}
          blurOnSubmit={multiline ? false : blurOnSubmit}
          returnKeyType={returnKeyType}
          multiline={multiline}
          enablesReturnKeyAutomatically={true}
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          onFocus={onFocusHandler}
          onBlur={onBlur}
          onEndEditing={onEndEditing}
          autoFocus={autoFocus}
          caretHidden={caretHidden}
          contextMenuHidden={contextMenuHidden}
          selectTextOnFocus={selectTextOnFocus}
          onKeyPress={onKeyPress}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={onContentSizeChange}
          style={[
            multiline ? styles.inputMultiline : null,
            eye || children ? styles.input : styles.input2,
            _inputStyle,
            inputStyle,
          ]}
        />
        {children}
        {withRightIcon ? rightIcon : null}
      </View>
    );
  },
);

Input.defaultProps = {
  height: isiPAD ? wp(8) : wp(13),
  fontSize: 'default',
  fontName: 'default',
  color: 'default',
  placeholder: 'Type something...',
  placeholderTextColor: '#9D9D9D',
  defaultValue: '',
  clearOnSubmit: false,
  blurOnSubmit: false,
  returnKeyType: 'default',
  multiline: false,
  multilineHeight: hp(10),
  autoCapitalize: null,
  editable: true,
  keyboardType: 'default',
  maxLength: null,
  secureTextEntry: false,
  onFocus: null,
  onBlur: null,
  autoFocus: false,
  textAlign: null,
  onChangeText: null,
  caretHidden: false,
  contextMenuHidden: false,
  selectTextOnFocus: false,
  willCheckPosition: true,
  withLeftIcon: false,
  withRightIcon: false,
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 10,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  input2: {
    // paddingLeft: wp(10),
    // paddingRight: 15,
    backgroundColor: 'transparent',
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: wp(3),
    paddingHorizontal: wp(3.5),
    borderWidth: wp(0.2),
    justifyContent: 'space-between',
  },
  wrapper2: {
    justifyContent: 'center',
  },
});

export default Input;
