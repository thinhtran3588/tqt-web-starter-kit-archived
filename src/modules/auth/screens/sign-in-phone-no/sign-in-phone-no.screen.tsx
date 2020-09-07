/* eslint-disable react/jsx-props-no-spreading */
import React, {useState, useEffect} from 'react';
import {useI18n} from 'next-localization';
import * as Yup from 'yup';
import {useImmer} from 'use-immer';
import {getStaticPaths, buildGetStaticProps} from '@app/core/i18n/i18n';
import {FormField, FormInput} from '@app/core/components/form-input/form-input.component';
import {useRouter} from '@app/core/hooks/use-router';
import {AuthService} from '@auth/interfaces/auth.service.interface';
import {useForm} from '@app/core/hooks/use-form';
import {AuthLayout} from '@app/core/components/auth-layout/auth-layout.component';
import {Link} from '@app/core/components/link/link.component';
import {Button} from '@app/core/components/button/button.component';
import COUNTRIES from '@app/core/i18n/countries.json';
import type {PickerDataItem} from '@app/core/interfaces';
import {config} from '@app/core/config';

interface FormData {
  countryCode: string;
  phoneNo: string;
}

interface VerificationStatus {
  codeSent: boolean;
  waitTime: number;
  phoneNo: string;
}

const countries: PickerDataItem[] = COUNTRIES.map((country) => ({
  value: country.code,
  label: `${country.name} (${country.dialCode})`,
}));

export const SignInPhoneNoScreen = (): JSX.Element => {
  const {t} = useI18n();
  const [authService, setAuthService] = useState<AuthService>();
  const router = useRouter();

  useEffect(() => {
    import('@auth/services/auth.service').then((service: AuthService) => {
      setAuthService(service);
    });
  }, []);

  const [verificationStatus, setVerificationStatus] = useImmer<VerificationStatus>({
    codeSent: false,
    waitTime: 0,
    phoneNo: '',
  });
  const [intervalCountSendTime, setIntervalCountSendTime] = useState<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (intervalCountSendTime) {
        clearInterval(intervalCountSendTime);
      }
    };
  }, [intervalCountSendTime]);

  const initialValues: FormData = {
    countryCode: config.defaultCountryCode,
    phoneNo: '',
  };

  const validationSchema = Yup.object().shape<FormData>({
    countryCode: Yup.string().required(t('common.required')),
    phoneNo: (Yup.number()
      .typeError(t('common.invalid'))
      .integer(t('common.invalid'))
      .min(1, t('common.invalid'))
      .required(t('common.required')) as unknown) as Yup.StringSchema<string>,
  });

  const sendCode = async (formValues: FormData): Promise<void> => {
    const country = COUNTRIES.find((c) => c.code === formValues.countryCode);
    const phoneNo = `${country?.dialCode}${formValues.phoneNo}`;
    await authService.sendPhoneNoVerificationCode(phoneNo);

    setVerificationStatus((draft) => {
      draft.waitTime = 30;
      draft.codeSent = true;
      draft.phoneNo = phoneNo;
    });

    setIntervalCountSendTime(
      setInterval(() => {
        setVerificationStatus((draft) => {
          if (draft.waitTime > 0) {
            draft.waitTime -= 1;
            return;
          }
          if (draft.waitTime < 0) {
            draft.waitTime = 0;
          }
          if (intervalCountSendTime) {
            clearInterval(intervalCountSendTime);
          }
        });
      }, 1000),
    );
  };

  const formik = useForm<FormData>({
    initialValues,
    validationSchema,
    onSubmit: sendCode,
    showLoading: false,
  });

  const fields: FormField<FormData>[] = [
    {
      fieldName: 'countryCode',
      fieldType: 'autocomplete',
      dataSources: countries,
      required: true,
      id: 'countryCode',
      name: 'countryCode',
      label: t('auth.countryCode'),
      renderOption: (option) => {
        const country = COUNTRIES.find((c) => c.code === option.value);
        return (
          <>
            {country?.name} ({country?.dialCode})
          </>
        );
      },
    },
    {
      fieldName: 'phoneNo',
      fieldType: 'text',
      required: true,
      id: 'phoneNo',
      name: 'phoneNo',
      label: t('auth.phoneNo'),
      disabled: verificationStatus.codeSent,
      placeholder: '377777777',
    },
  ];

  const signIn = async (formValues: {verificationCode: string}): Promise<void> => {
    await authService.verifyCode(formValues.verificationCode);
    router.push('/');
  };

  const codeForm = useForm<{verificationCode: string}>({
    initialValues: {verificationCode: ''},
    validationSchema: Yup.object().shape({
      verificationCode: Yup.string().required(t('common.required')),
    }),
    onSubmit: signIn,
  });

  const codeField: FormField<{verificationCode: string}> = {
    fieldName: 'verificationCode',
    fieldType: 'text',
    required: true,
    id: 'verificationCode',
    name: 'verificationCode',
    label: t('auth.verificationCode'),
  };

  useEffect(() => {
    if (authService) {
      authService.registerRecaptchaVerifier('btn-send-verification-code', formik.handleSubmit);
    }
  }, [authService, formik.handleSubmit]);

  return (
    <AuthLayout title={t('nav.signInWithPhoneNo')}>
      <form onSubmit={formik.handleSubmit}>
        {fields.map((field, index) => (
          <FormInput key={index.toString()} form={formik} field={field} />
        ))}
        <Button id='btn-send-verification-code' type='submit' disabled={verificationStatus.waitTime !== 0}>
          {`${t('auth.sendVerificationCode')}${
            verificationStatus.waitTime !== 0 ? `(${verificationStatus.waitTime})` : ''
          }`}
        </Button>
      </form>
      {verificationStatus.codeSent && (
        <form onSubmit={codeForm.handleSubmit}>
          <FormInput form={codeForm} field={codeField} />
          <Button type='submit'>{t('auth.signIn')}</Button>
        </form>
      )}
      <Link href='/sign-in'>
        <Button tabIndex={-1} variant='text'>
          {t('auth.backToSignIn')}
        </Button>
      </Link>
    </AuthLayout>
  );
};

const getStaticProps = buildGetStaticProps(['common', 'nav', 'auth']);
export {getStaticPaths, getStaticProps};
