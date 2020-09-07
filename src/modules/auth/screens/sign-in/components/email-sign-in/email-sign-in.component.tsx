import React, {useState, useEffect} from 'react';
import {useI18n} from 'next-localization';
import * as Yup from 'yup';
import {FormField, FormInput} from '@app/core/components/form-input/form-input.component';
import {Button} from '@app/core/components/button/button.component';
import {Link} from '@app/core/components/link/link.component';
import type {AuthService} from '@app/modules/auth/interfaces/auth.service.interface';
import {useForm} from '@app/core/hooks/use-form';
import {useRouter} from '@app/core/hooks/use-router';

interface FormData {
  email: string;
  password: string;
}

const initialValues: FormData = {
  email: '',
  password: '',
};

export const EmailSignIn = (): JSX.Element => {
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
    password: Yup.string().required(t('common.required')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    const {email, password} = formValues;
    const isSignedIn = await authService.signInEmail({
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
      id: 'email',
      name: 'email',
      label: t('auth.email'),
    },
    {
      fieldName: 'password',
      fieldType: 'text',
      required: true,
      id: 'password',
      name: 'password',
      type: 'password',
      label: t('auth.password'),
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map((field) => (
        <FormInput<FormData> key={field.fieldName} form={formik} field={field} />
      ))}
      <Button type='submit'>{t('auth.signIn')}</Button>
      <Link href='/sign-in-phone-no'>
        <Button tabIndex={-1}>{t('auth.signInWithPhoneNo')}</Button>
      </Link>
      <Link href='/forgot-password'>
        <Button tabIndex={-1} variant='text'>
          {t('auth.forgotPassword')}
        </Button>
      </Link>
    </form>
  );
};
