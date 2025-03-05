import axios from 'axios'
import { defineStore } from 'pinia'
import {
  fetchQuestionDetailsService,
  getQuestionsService,
  sendAnswerService,
} from 'src/services/questionsService'

export const useQuestionStore = defineStore('questionStore', {
  state: () => ({
    questions: [],
    cashedQuestions: [],
    question: null,
    answer: '',
    algorithm_id: '',
    error: null,
    loading: false,
  }),
  getters: {
    getAllQuestions(state) {
      return state.questions
    },
    getQuestion(state) {
      return state.question
    },
    getAlgorithmId(state) {
      return state.algorithm_id
    },
  },
  actions: {
    async fetchAllQuestions() {
      if (this.cashedQuestions.length > 0) {
        this.questions = this.cashedQuestions
        return
      }
      this.loading = true
      this.error = null
      try {
        const res = await getQuestionsService()
        if (res) {
          console.log(res.data)

          this.questions = res.data || []
          this.cashedQuestions = res.data || []
        }
      } catch (e) {
        this.error = 'Ошибка получения вопросов'
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async fetchQuestionDetails(questionId) {
      this.loading = true
      this.error = null
      try {
        const res = await fetchQuestionDetailsService(questionId)
        if (res) {
          this.question = res.data || []
          console.log(res.data)
          this.algorithm_id = res.data ? res.data.algorithm_id : ''
          console.log('Selected algorithm_id:', this.algorithm_id)
        }
      } catch (e) {
        this.error = 'Ошибка получения вопроса'
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    async postAnswer(data, algorithmId) {
      this.loading = true
      this.error = null

      try {
        const res = await sendAnswerService(data)
        if (!res) throw new Error('Пустой ответ от сервера')
        this.answer = res
        console.log('answer equal', this.answer)
        const nextQuestionRes = await axios.get(
          `http://45.87.247.139:8000/api/v1/forms/${algorithmId}/questions/next`,
        )
        this.questions = nextQuestionRes.data
      } catch (e) {
        this.error = 'Ошибка при загрузке вопроса'
        console.error('Ошибка:', e.response?.data || e.message)
      } finally {
        this.loading = false
      }
    },
  },
})
