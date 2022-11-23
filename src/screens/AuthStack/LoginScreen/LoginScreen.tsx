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
import theme from '../../../theme';
import useAuth from '../../../contexts';
import { storeItemInSecureStore } from '../../../utilities/secureStorage';

type Props = {
  navigation: any;
};

const validation = yup.object().shape({
  email: yup.string().email().required('email is required'),
  password: yup.string().required('password is required'),
});

const LoginScreen = ({ navigation }: Props) => {
  const { setCredentials } = useAuth();

  const ref_emailInput = useRef<TextInput>(null);
  const ref_passwordInput = useRef<TextInput>(null);
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
    },
  });

  const onSubmit = useCallback(async (values: any) => {
    try {
      const response = await supaBaseclient.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (response.data && response.data.session?.access_token) {
        setError('');
        setCredentials(response.data.session.access_token);
        return;
      }
      setError('Invalid email or password');
    } catch (error) {
      setError('Login went wrong');
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.inner}>
            <Header variant="h1">Login</Header>
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
                returnKeyType="done"
                innerRef={ref_passwordInput}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
            </View>
            <View style={styles.row}>
              <Button onPress={handleSubmit(onSubmit)}>Login</Button>
            </View>
            <View style={styles.row}>
              <Button
                backgroundColor={theme.colors.secondary}
                onPress={() => navigation.navigate('Registration')}
              >
                Sign up
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;
