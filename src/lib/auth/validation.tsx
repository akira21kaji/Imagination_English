import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string().email('メールアドレスの形式が間違っています').required('メールアドレスは必須項目です'),
  password: Yup.string().min(8,'パスワードは8文字以上です').required('パスワードは必須項目です'),
});