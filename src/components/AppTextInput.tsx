import React from 'react';
import { StyleSheet, Text, TextInput, View, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors.ts';

type AppTextInputProps = TextInputProps & {
  icon?: string;
  label?: string;
};

const AppTextInput = ({
                        icon,
                        label,
                        value,
                        onChangeText,
                        placeholder,
                        secureTextEntry,
                        keyboardType = 'default',
                        autoCapitalize = 'none',
                        ...rest
                      }: AppTextInputProps) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View style={styles.inputField}>
        {icon && (
          <Icon name={icon} size={20} color={colors.black} style={styles.icon} />
        )}
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholderTextColor="#999"
          {...rest}
        />
      </View>
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    fontSize: 12,
    zIndex: 1,
    color: colors.black,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 68,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.black,
  },
});
