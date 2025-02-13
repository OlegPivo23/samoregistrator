import axios from 'axios'

export async function getQuestionsService() {
  try {
    const res = await axios.get('http://45.87.247.139:8000/api/forms/')
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
    const res = await axios.get(`http://45.87.247.139:8000/api/forms/${questionId}/`)
    return res
  } catch (error) {
    console.error('Ошибка при загрузке вопроса:', error)
  }
}
