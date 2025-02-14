import { ref, computed } from 'vue'
import { formConfigurations } from 'src/configs/formConfig'
import { useRouter } from 'vue-router'

export const useForm = (initialForm = 'login') => {
  const router = useRouter()

  const activeForm = ref(initialForm)
  const formFields = ref({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  })
  const errors = ref({
    nameError: '',
    passwordError: '',
    confirmPasswordError: '',
    emailError: '',
  })
  const touched = ref({
    name: false,
    password: false,
    confirmPassword: false,
    email: false,
  })

  const currentFormConfig = computed(() => formConfigurations[activeForm.value])
  const validateField = (field) => {
    if (field === 'name') {
      errors.value.nameError =
        formFields.value.name.length < 3 ? 'Имя должно быть не менее 3 символов' : ''
    } else if (field === 'password') {
      errors.value.passwordError =
        formFields.value.password.length < 6 ? 'Пароль должен быть не менее 6 символов' : ''
    } else if (field === 'confirmPassword') {
      errors.value.confirmPasswordError =
        formFields.value.confirmPassword.length < 6
          ? 'Подтверждение пароля должно быть не менее 6 символов'
          : formFields.value.password !== formFields.value.confirmPassword
            ? 'Пароли не совпадают'
            : ''
    } else if (field === 'email') {
      errors.value.emailError =
        formFields.value.email.length < 5 ? 'Email должен быть не менее 5 символов' : ''
    }
  }

  const handleBlur = (field) => {
    touched.value[field] = true
    validateField(field)
  }

  const isValid = computed(() => {
    validateField()
    if (activeForm.value === 'login') {
      return formFields.value.name.length >= 3 && formFields.value.password.length >= 6
    } else if (activeForm.value === 'register') {
      return (
        formFields.value.name.length >= 3 &&
        formFields.value.password.length >= 6 &&
        formFields.value.confirmPassword.length >= 6 &&
        formFields.value.password === formFields.value.confirmPassword
      )
    } else if (activeForm.value === 'forgot') {
      return formFields.value.email.length >= 5
    }
    return false
  })

  const formTitle = computed(() => currentFormConfig.value.title)
  const submitButtonLabel = computed(() => {
    if (activeForm.value === 'login') return 'Войти'
    if (activeForm.value === 'register') return 'Зарегистрироваться'
    return 'Восстановить пароль'
  })

  const handleSubmit = () => {
    if (!isValid.value) {
      alert('Пожалуйста, исправьте ошибки перед отправкой формы')
      return
    }

    if (activeForm.value === 'login') {
      alert('Вы вошли в систему!')
      router.push('/cabinet')
    } else if (activeForm.value === 'register') {
      alert('Вы зарегистрировались!')
      router.push('/cabinet')
    } else if (activeForm.value === 'forgot') {
      alert('Инструкция по восстановлению пароля отправлена на ваш email!')
    }
  }

  const switchForm = (formName) => {
    activeForm.value = formName
  }

  return {
    activeForm,
    formFields,
    errors,
    currentFormConfig,
    formTitle,
    submitButtonLabel,
    isValid,
    handleSubmit,
    switchForm,
    handleBlur,
    touched,
  }
}
