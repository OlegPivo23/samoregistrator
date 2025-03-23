export async function submitAnswer({ answers, questions, algorithmId, postAnswer }) {
  const selectedEntries = Object.entries(answers)

  if (selectedEntries.length === 0) {
    console.error('Ошибка: Нет выбранных ответов')
    return
  }

  const values = selectedEntries.reduce((acc, [questionId, selected]) => {
    // Преобразуем questions в массив
    const question = Object.values(questions).find((q) => q.node_id == questionId)
    if (!question) return acc

    if (question.type === 'ONE') {
      acc = questionId
    } else if (question.type === 'MUL') {
      acc.push({
        question_id: Number(questionId),
        answer_id: Array.isArray(selected) ? selected : [selected],
      })
    } else if (question.type === 'TEXT') {
      acc.push({
        question_id: Number(questionId),
        answer_text: selected, // Для текстовых ответов
      })
    }
    return acc
  }, [])

  // Преобразуем questions в массив для получения node_id
  const questionIds = Object.values(questions).map((q) => q.node_id)

  const data = {
    question: questionIds, // Массив всех node_id вопросов
    values,
    response_type: Object.values(questions)
      .map((q) => q.type)
      .toString(), // Преобразуем в массив и извлекаем типы вопросов
    user: 1,
    algorithm: Number(algorithmId),
  }

  try {
    const response = await postAnswer(data, algorithmId)
    console.log('Ответ от сервера:', response)

    if (response.newQuestion) {
      // Если нужно, обновить вопросы
      return { newQuestions: [response.newQuestion], resetAnswers: true }
    } else {
      console.log('Опрос завершен')
      return { newQuestions: [], resetAnswers: false }
    }
  } catch (error) {
    console.error('Ошибка при отправке ответа:', error)
    throw error
  }
}
