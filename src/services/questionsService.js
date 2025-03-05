import axios from 'axios'

export async function getQuestionsService() {
  try {
    const res = await axios.get('http://45.87.247.139:8000/api/v1/forms/')
    if (res.status === 200) {
      return res
    }
    console.error('Error: Invalid status', res.status)
    return null
  } catch (e) {
    console.error('Error fetching data:', e)
    return null
  }
}

export async function fetchQuestionDetailsService(questionId) {
  try {
    const res = await axios.get(`http://45.87.247.139:8000/api/v1/forms/${questionId}/`)
    return res
  } catch (error) {
    console.error('Ошибка при загрузке вопроса:', error)
  }
}

export async function sendAnswerService(data) {
  try {
    const res = await axios.post('http://45.87.247.139:8000/api/v1/responses/', data)
    console.log('Отправка данных:', JSON.stringify(data, null, 2)) 
    return res.data
  } catch (error) {
    console.error('Ошибка при отправке ответа:', error.response?.data || error.message)
    throw error
  }
}
