import {useFormik, FormikConfig, FormikContextType} from 'formik';
import {useDispatch} from 'react-redux';
import type {Dispatch} from '@app/stores/store';

export const useForm = <Values>(params: FormikConfig<Values> & {showLoading?: boolean}): FormikContextType<Values> => {
  const {showLoading = true, ...config} = params;
  const form = useFormik<Values>(config);
  const {
    loading: {setLoading},
  } = useDispatch<Dispatch>();

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement> | undefined): Promise<void> => {
    if (e && e.preventDefault && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (e && e.stopPropagation && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    showLoading && setLoading(true);
    await form.submitForm();
    showLoading && setLoading(false);
  };

  return {...form, handleSubmit};
};
