import type { ChatMessage } from '@/interfaces/chat-message.interface';
import { test, expect, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import ChatBubble from '@/components/chat/ChatBubble.vue';

const messages: ChatMessage[] = [
  {
    id: 1,
    message: 'Hello, World!',
    isMine: true,
  },
  {
    id: 2,
    message: 'Bye, World!',
    isMine: false,
  },
  {
    id: 3,
    message: 'Hello, World!',
    isMine: true,
  },
  {
    id: 4,
    message: 'Bye, World!',
    isMine: false,
  },
];

const wrapper = mount(ChatMessages, {
  props: {
    messages,
  },
});

describe('<ChatMessages tests/>', () => {
  test('ChatMessages renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Find elements by classes and ids', () => {
    expect(wrapper.find('#messagesUp').exists()).toBeTruthy();
    expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy();
  });

  test('renders chat messages correctly', () => {
    const chatBubbles = wrapper.findAllComponents(ChatBubble);
    expect(chatBubbles).toHaveLength(messages.length);
  });

  test('scrolls down to the bottom when new messages are added', async () => {
    //(Alternative to solution in ChatView.spec.ts, to mock the scrolling behavior during testing.):This is to avoid the TypeError: chatRef.value.scrollTo is not a function:
    const scrollToMock = vi.fn();
    console.log(wrapper.vm.$refs);
    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;
    chatRef.scrollTo = scrollToMock;

    // ACT:
    await wrapper.setProps({
      messages: [...messages, { id: 5, message: 'Hello, World!', isMine: true }],
    });

    // Delay to avoid the false positive:
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(scrollToMock).toHaveBeenCalled();
    expect(scrollToMock).toHaveBeenCalledTimes(1);
    expect(scrollToMock).toHaveBeenCalledWith({ behavior: 'smooth', top: expect.any(Number) });
  });
});
