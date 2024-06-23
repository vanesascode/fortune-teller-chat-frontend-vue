<template>
  <div ref="chatRef" class="flex-1 overflow-y-auto p-4">
    <div class="flex flex-col space-y-2" id="messagesUp">
      <ChatBubble v-for="message in messages" :key="message.id" v-bind="message" />
      <!--  v-bind="message" is the short way of this --     :message="message.message"
      :isMine="message.isMine"
      :image="message.image" -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/interfaces/chat-message.interface'
import ChatBubble from './ChatBubble.vue'
import { ref, onUpdated } from 'vue'

interface Props {
  messages: ChatMessage[]
}

const { messages } = defineProps<Props>()

const chatRef = ref<HTMLDivElement | null>(null)

// The following code shows that the script is run first and then the component is rendered and the ref is set. Careful with this.
setTimeout(() => {
  console.log(chatRef.value)
}, 1000)

onUpdated(() => {
  if (chatRef.value) {
    chatRef.value.scrollTo({
      top: chatRef.value.scrollHeight,
      behavior: 'smooth'
    })
  }
})

//Supposedly this should work but doesn't:

// watch(messages, () => {
//   console.log('messages changed', messages.length)
//   chatRef.value?.scrollTo({
//     top: chatRef.value.scrollHeight,
//     behavior: 'smooth'
//   })
// })
</script>
