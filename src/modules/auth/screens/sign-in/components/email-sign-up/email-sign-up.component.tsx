import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useI18n} from 'next-localization';
import * as Yup from 'yup';
import {FormField, FormInput} from '@app/core/components/form-input/form-input.component';
import {Button} from '@app/core/components/button/button.component';
import type {AuthService} from '@app/modules/auth/interfaces/auth.service.interface';
import {useForm} from '@app/core/hooks/use-form';

interface FormData {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

const initialValues: FormData = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const EmailSignUp = (): JSX.Element => {
  const {t} = useI18n();
  const router = useRouter();
  const [authService, setAuthService] = useState<AuthService>();

  useEffect(() => {
    import('@auth/services/auth.service').then((service: AuthService) => {
      setAuthService(service);
    });
  }, []);

  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('common.invalid')).required(t('common.required')),
    password: Yup.string()
      .required(t('common.required'))
      .min(8, t('auth.passwordMinLengthRequired', {minLength: 8}))
      .matches(/(?=.*?[A-Z])/, t('auth.passwordUpperCaseRequired'))
      .matches(/(?=.*?[a-z])/, t('auth.passwordLowerCaseRequired'))
      .matches(/(?=.*?[0-9])/, t('auth.passwordDigitRequired'))
      .matches(/(?=.*?[#?!@$%^&*-])/, t('auth.passwordSpecialCharacterRequired')),
    passwordConfirmation: Yup.string()
      .required(t('common.required'))
      .oneOf([Yup.ref('password')], t('auth.passwordMustMatch')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    const {email, password} = formValues;
    const isSignedIn = await authService.signUpEmail({
      email,
      password,
    });
    if (isSignedIn) {
      router.push('/');
    }
  };

  const formik = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const fields: FormField<FormData>[] = [
    {
      fieldName: 'email',
      fieldType: 'text',
      required: true,
      id: 'sign-up-email',
      name: 'email',
      label: t('auth.email'),
    },
    {
      fieldName: 'password',
      fieldType: 'text',
      required: true,
      id: 'sign-up-password',
      name: 'password',
      type: 'password',
      label: t('auth.password'),
    },
    {
      fieldName: 'passwordConfirmation',
      fieldType: 'text',
      required: true,
      id: 'sign-up-password',
      name: 'confirm-password',
      type: 'password',
      label: t('auth.passwordConfirmation'),
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field, index) => (
        <FormInput key={index.toString()} form={formik} field={field} />
      ))}
      <Button type='submit'>{t('auth.signUp')}</Button>
    </form>
  );
};
