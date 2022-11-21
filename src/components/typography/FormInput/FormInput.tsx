import React from 'react';
import { ReturnKeyType, TextInput } from 'react-native';
import { useController, UseControllerProps } from 'react-hook-form';
import styles from './styles';

type Props = UseControllerProps<any> & {
  innerRef: any;
  onSubmitEditing: any;
  text: string;
  secureTextEntry: boolean;
  returnKeyType: ReturnKeyType;
};

export default function FormInput(props: Props) {
  const { field, fieldState } = useController(props);

  return (
    <TextInput
      style={styles.input}
      {...field}
      onChangeText={field.onChange}
      placeholder={props.name}
      autoCapitalize="none"
      onSubmitEditing={props.onSubmitEditing}
      ref={props.innerRef}
      autoCorrect={false}
      blurOnSubmit={false}
      returnKeyType={props.returnKeyType}
      secureTextEntry={props.secureTextEntry}
    />
  );
}
