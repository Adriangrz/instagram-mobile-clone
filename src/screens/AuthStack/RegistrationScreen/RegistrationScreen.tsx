import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styles from './styles';
import Header from '../../../components/typography/Header';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../../components/typography/Button';
import { supaBaseclient } from '../../../utilities/supabaseClient';
import FormInput from '../../../components/typography/FormInput';
import { useHeaderHeight } from '@react-navigation/elements';

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
  const headerHeight = useHeaderHeight();
  const ref_emailInput = useRef<TextInput>(null);
  const ref_passwordInput = useRef<TextInput>(null);
  const ref_passwordConfirmationInput = useRef<TextInput>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    ref_emailInput.current?.focus();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = useCallback(async (values: any) => {
    try {
      const response = await supaBaseclient.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (response.data && response.data.session?.access_token) {
        setError('');
        //navigation.navigate('Login');
        return;
      }
      setError('Registration failed');
    } catch (error) {
      setError('Register went wrong');
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={headerHeight}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.inner}>
            <Header variant="h1">Register</Header>
            {error && <Text style={styles.error}>{error}</Text>}
            <View style={styles.row}>
              <FormInput
                control={control}
                name="email"
                text="email"
                secureTextEntry={false}
                returnKeyType="next"
                innerRef={ref_emailInput}
                onSubmitEditing={() => {
                  setTimeout(() => {
                    if (ref_passwordInput.current) {
                      ref_passwordInput.current.focus();
                    }
                  }, 1000);
                }}
              />
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </View>
            <View style={styles.row}>
              <FormInput
                control={control}
                name="password"
                text="password"
                secureTextEntry={true}
                returnKeyType="next"
                innerRef={ref_passwordInput}
                onSubmitEditing={() => {
                  setTimeout(() => {
                    if (ref_passwordConfirmationInput.current) {
                      ref_passwordConfirmationInput.current.focus();
                    }
                  }, 1000);
                }}
              />
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </View>
            <View style={styles.row}>
              <FormInput
                control={control}
                name="passwordConfirmation"
                text="confirm password"
                secureTextEntry={true}
                returnKeyType="done"
                innerRef={ref_passwordConfirmationInput}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.passwordConfirmation && (
                <Text style={styles.error}>{errors.passwordConfirmation.message}</Text>
              )}
            </View>
            <View style={styles.row}>
              <Button onPress={handleSubmit(onSubmit)}>Register</Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
