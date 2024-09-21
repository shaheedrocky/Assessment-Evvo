import {View, Text, TextInput} from 'react-native';
import React from 'react';

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error: string
}

const CustomInput = ({value, onChangeText, placeholder, error}: CustomInputProps) => {
  return (
    <>
      <View className="border border-gray-400 rounded px-4 flex-row items-center">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={'#b1b1b1'}
        />
      </View>
      {error && <Text className='text-red-600 font-medium text-sm mt-1'>{error}</Text>}
    </>
  );
};

export default CustomInput;
