import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import styles from './styles';
import Header from '../../components/typography/Header';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../components/typography/Button';
import { supaBaseclient } from '../../utilities/supabaseClient';

type Props = {
  navigation: any;
};

const validation = yup.object().shape({
  email: yup.string().email().required('email is required'),
  password: yup.string().required('password is required'),
  passwordConfirmation: yup
    .string()
    .required('password confirmation is required')
    .oneOf([yup.ref('password'), null], 'passwords must match'),
});

const RegistrationScreen = ({ navigation }: Props) => {
  const ref_emailInput = useRef<TextInput>(null);
  const ref_passwordInput = useRef<TextInput>(null);
  const ref_passwordConfirmationInput = useRef<TextInput>(null);

  useEffect(() => {
    ref_emailInput.current?.focus();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = useCallback(async (values: any) => {
    const response = await supaBaseclient.auth.signUp({
      email: values.email,
      password: values.password,
    });
    console.log(response);
  }, []);

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Header variant="h1">Register</Header>
          <View style={styles.row}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  ref={ref_emailInput}
                  onSubmitEditing={() => {
                    setTimeout(() => {
                      if (ref_passwordInput.current) {
                        ref_passwordInput.current.focus();
                      }
                    }, 1000);
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder="email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          </View>
          <View style={styles.row}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  ref={ref_passwordInput}
                  onSubmitEditing={() => {
                    setTimeout(() => {
                      if (ref_passwordConfirmationInput.current) {
                        ref_passwordConfirmationInput.current.focus();
                      }
                    }, 1000);
                  }}
                  autoCapitalize="words"
                  autoCorrect={false}
                  blurOnSubmit={false}
                  returnKeyType="next"
                  placeholder="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
              )}
            />
            {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
          </View>
          <View style={styles.row}>
            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  ref={ref_passwordConfirmationInput}
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="done"
                  placeholder="confirm password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
            {errors.passwordConfirmation && (
              <Text style={styles.error}>{errors.passwordConfirmation.message}</Text>
            )}
          </View>
          <View style={styles.row}>
            <Button onPress={handleSubmit(onSubmit)}>Register</Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
