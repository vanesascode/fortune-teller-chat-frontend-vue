<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto">
    <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
      <span>Mi esposa</span>
    </div>

    <ChatMessages :messages="messages" />

    <ChatBox @send-message="onMessage($event)" />
  </div>
</template>

<script setup lang="ts">
import ChatMessages from '@/components/chat/ChatMessages.vue'
import ChatBox from '@/components/chat/ChatBox.vue'
import type { ChatMessage } from '@/interfaces/chat-message.interface'
import { ref } from 'vue'

const messages = ref<ChatMessage[]>([
  {
    id: new Date().getTime(),
    isMine: true,
    message: 'Hello, how are you?'
  },
  {
    id: new Date().getTime() + 1,
    isMine: false,
    message: 'Bad',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  }
])

const onMessage = (text: string) => {
  messages.value.push({
    id: new Date().getTime(),
    isMine: true,
    message: text
  })
}
</script>
