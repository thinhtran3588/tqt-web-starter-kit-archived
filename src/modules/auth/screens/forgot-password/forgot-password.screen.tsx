/* eslint-disable react/jsx-props-no-spreading */
import React, {useState, useEffect} from 'react';
import {useI18n} from 'next-localization';
import {getStaticPaths, getStaticProps} from '@app/core/i18n/i18n';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import {useNotification} from '@app/core/contexts/notification.context';
import {FormField, FormInput} from '@app/core/components/form-input/form-input.component';
import {useRouter} from '@app/core/hooks/use-router';
import {AuthService} from '@auth/interfaces/auth.service.interface';
import {useForm} from '@app/core/hooks/use-form';
import {AuthLayout} from '@app/core/components/auth-layout/auth-layout.component';
import {Link} from '@app/core/components/link/link.component';
import {Button} from '@app/core/components/button/button.component';

interface FormData {
  email: string;
}

export const ForgotPasswordScreen = (): JSX.Element => {
  const {t} = useI18n();
  const [authService, setAuthService] = useState<AuthService>();
  const {showNotification} = useNotification();
  const router = useRouter();

  useEffect(() => {
    import('@auth/services/auth.service').then((service: AuthService) => {
      setAuthService(service);
    });
  }, []);

  const initialValues: FormData = {
    email: '',
  };

  const validationSchema = Yup.object().shape<FormData>({
    email: Yup.string().email(t('common:invalid')).required(t('common:required')),
  });

  const onSubmit = async (formValues: FormData): Promise<void> => {
    await authService.sendPasswordResetEmail(formValues.email);
    showNotification({message: t('auth.requestHasBeenSent', {email: formValues.email})});
    router.push('/sign-in');
  };

  const formik = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const emailField: FormField<FormData> = {
    fieldName: 'email',
    fieldType: 'text',
    required: true,
    id: 'email',
    name: 'email',
    label: t('auth.email'),
  };

  return (
    <AuthLayout title={t('nav.forgotPassword')}>
      <Typography variant='h6' align='center'>
        {t('nav.forgotPassword')}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormInput form={formik} field={emailField} />
        <Button type='submit'>{t('auth.sendPasswordRecoveryEmail')}</Button>
        <Link href='/sign-in'>
          <Button tabIndex={-1} variant='text'>
            {t('auth.backToSignIn')}
          </Button>
        </Link>
      </form>
    </AuthLayout>
  );
};

export {getStaticPaths, getStaticProps};
