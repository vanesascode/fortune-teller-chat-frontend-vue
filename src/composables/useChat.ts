import { delay } from '@/helpers/delay'
import type { ChatMessage } from '@/interfaces/chat-message.interface'
import type { YesNoResponse } from '@/interfaces/yes-no.response'
import { ref } from 'vue'

export const useChat = () => {
  const messages = ref<ChatMessage[]>([
    // {
    //   id: new Date().getTime(),
    //   isMine: true,
    //   message: 'Hello, how are you?'
    // },
    // {
    //   id: new Date().getTime() + 1,
    //   isMine: false,
    //   message: 'Bad',
    //   image:
    //     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    // }
  ])

  const getResponse = async () => {
    const res = await fetch('https://yesno.wtf/api')
    const data = (await res.json()) as YesNoResponse
    return data
  }

  const onMessage = async (text: string) => {
    if (text.length === 0) return

    messages.value = [
      ...messages.value,
      {
        id: new Date().getTime(),
        isMine: true,
        message: text
      }
    ]

    if (!text.endsWith('?')) return

    await delay()

    const { answer, image } = await getResponse()

    messages.value = [
      ...messages.value,
      {
        id: new Date().getTime(),
        isMine: false,
        message: answer,
        image: image
      }
    ]
  }

  return {
    messages,
    onMessage
  }
}
