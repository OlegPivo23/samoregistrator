import { defineStore } from 'pinia'
import { fetchQuestionDetailsService, getQuestionsService } from 'src/services/questionsService'

export const useQuestionStore = defineStore('questionStore', {
  state: () => ({
    questions: [],
    cashedQuestions: [],
    question: null,
    cashedQuestion: null,
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
      if (this.cashedQuestion) {
        this.question = this.cashedQuestion
        return
      }
      this.loading = true
      this.error = null
      try {
        const res = await fetchQuestionDetailsService(questionId)
        if (res) {
          this.question = res.data || []
          this.cashedQuestion = res.data || []
        }
      } catch (e) {
        this.error = 'Ошибка получения вопроса'
        console.error(e)
      } finally {
        this.loading = false
      }
    },
  },
})
