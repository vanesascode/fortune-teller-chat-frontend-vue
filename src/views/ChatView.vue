<template>
  <div class="bg-gray-100 h-screen flex flex-col max-w-lg mx-auto rounded-lg">
    <p class="chat-view-title">Ask <b>Yes</b> or <b>No</b> questions to your fortune-teller:</p>

    <ChatMessages :messages="messages" />

    <ChatInput @send-message="onMessage($event)" />
  </div>
</template>

<script setup lang="ts">
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import { useChat } from '@/composables/useChat';

const { messages, onMessage } = useChat();
</script>
