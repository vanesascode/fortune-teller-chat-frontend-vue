import { mount } from '@vue/test-utils';
import ChatView from '@/views/ChatView.vue';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import { describe, expect, test } from 'vitest';

const mockChatMessages = {
  template: ` <div data-testid="mock-messages">Mock Chat Messages</div>`,
};

describe('<ChatView tests/>', () => {
  const wrapper = mount(ChatView);
  test('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('renders ChatMessages and ChatInput components properly', () => {
    expect(wrapper.findComponent(ChatMessages).exists()).toBeTruthy();
    expect(wrapper.findComponent(ChatInput).exists()).toBeTruthy();
  });

  test('calls onMessage when a message is sent', async () => {
    //(Alternative to solution in ChatMessages.spec.ts): This is to avoid the TypeError: chatRef.value.scrollTo is not a function:
    const wrapper = mount(ChatView, {
      global: {
        stubs: {
          ChatMessages: mockChatMessages,
        },
      },
    });

    // ACT:
    const chatInputComponent = wrapper.findComponent(ChatInput);
    chatInputComponent.vm.$emit('sendMessage', 'Hello, World!');

    // Delay to avoid the false positive:
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ASSERT:
    expect(wrapper.html()).toMatchSnapshot();
  });
});
