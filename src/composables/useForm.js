import { ref, computed } from 'vue'
import { formConfigurations } from 'src/components/forms/hooks/formConfig'

export const useForm = (initialForm = 'login') => {
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

  const currentFormConfig = computed(() => formConfigurations[activeForm.value])

  const isValid = computed(() => {
    if (activeForm.value === 'login') {
      return formFields.value.name && formFields.value.password
    } else if (activeForm.value === 'register') {
      return (
        formFields.value.name &&
        formFields.value.password &&
        formFields.value.confirmPassword &&
        formFields.value.password === formFields.value.confirmPassword
      )
    } else if (activeForm.value === 'forgot') {
      return formFields.value.email
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
    if (activeForm.value === 'login') {
      alert('Вы вошли в систему!')
    } else if (activeForm.value === 'register') {
      alert('Вы зарегистрировались!')
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
  }
}
