export const formConfigurations = {
  login: {
    title: 'Войти',
    fields: [
      { label: 'Имя', type: 'text', model: 'name', error: 'nameError' },
      { label: 'Пароль', type: 'password', model: 'password', error: 'passwordError' },
    ],
    buttons: [
      { label: 'Забыли пароль?', targetForm: 'forgot' },
      { label: 'Нет аккаунта? Регистрация', targetForm: 'register' },
    ],
  },
  register: {
    title: 'Регистрация',
    fields: [
      { label: 'Имя', type: 'text', model: 'name', error: 'nameError' },
      { label: 'Пароль', type: 'password', model: 'password', error: 'passwordError' },
      {
        label: 'Подтвердите пароль',
        type: 'password',
        model: 'confirmPassword',
        error: 'confirmPasswordError',
      },
    ],
    buttons: [
      { label: 'Уже есть аккаунт? Войти', targetForm: 'login' },
      { label: 'Забыли пароль?', targetForm: 'forgot' },
    ],
  },
  forgot: {
    title: 'Восстановление пароля',
    fields: [{ label: 'Email', type: 'email', model: 'email', error: 'emailError' }],
    buttons: [
      { label: 'Уже вспомнили пароль? Войти', targetForm: 'login' },
      { label: 'Нет аккаунта? Регистрация', targetForm: 'register' },
    ],
  },
}
