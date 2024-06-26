import { delay } from '@/helpers/delay';
import type { ChatMessage } from '@/interfaces/chat-message.interface';
import type { YesNoResponse } from '@/interfaces/yes-no.response';
import { ref } from 'vue';

export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);

  const getResponse = async () => {
    const res = await fetch(import.meta.env.VITE_API_URL);
    const data = (await res.json()) as YesNoResponse;
    return data;
  };

  const onMessage = async (text: string) => {
    if (text.length === 0) return;

    messages.value = [
      ...messages.value,
      {
        id: new Date().getTime(),
        isMine: true,
        message: text,
      },
    ];

    if (!text.endsWith('?')) return;

    await delay();

    const { answer, image } = await getResponse();

    messages.value = [
      ...messages.value,
      {
        id: new Date().getTime(),
        isMine: false,
        message: answer,
        image: image,
      },
    ];
  };

  return {
    messages,
    onMessage,
  };
};
