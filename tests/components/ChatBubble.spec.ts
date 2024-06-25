import { mount } from '@vue/test-utils';
import ChatBubble from '@/components/chat/ChatBubble.vue';
import { describe, expect, test } from 'vitest';

const mountChatBubbleComponent = (message: string, isMine: boolean, image?: string) => {
  return mount(ChatBubble, {
    props: {
      message,
      isMine,
      image,
    },
  });
};

const MESSAGE = 'Hello, World!';

describe('<ChatBubble tests/>', () => {
  test('ChatBubble renders correctly', () => {
    const wrapper = mountChatBubbleComponent(MESSAGE, true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('ChatBubble renders correctly when isMine is false', () => {
    const wrapper = mountChatBubbleComponent(MESSAGE, false, 'https://image.jpg');
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Find elements by classes when isMine is true', () => {
    const wrapper = mountChatBubbleComponent(MESSAGE, true);

    expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy();
    expect(wrapper.find('.bg-gray-300').exists()).toBeFalsy();
  });

  test('Find elements by classes when isMine is false', () => {
    const wrapper = mountChatBubbleComponent(MESSAGE, false);

    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy();
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy();
  });

  test('Message shown is the same as the prop when isMine is false', () => {
    const wrapper = mountChatBubbleComponent(MESSAGE, false);

    expect(wrapper.text()).toBe(MESSAGE);
    expect(wrapper.find('span').text()).toContain(MESSAGE);
  });

  test('Message shown is the same as the prop when isMine is true', () => {
    const wrapper = mountChatBubbleComponent(MESSAGE, true);

    const [, secondDiv] = wrapper.findAll('div');

    expect(secondDiv.text()).toContain(MESSAGE);
  });

  test('Image does not exist when isMine is true', () => {
    const wrapper = mountChatBubbleComponent(MESSAGE, true);

    expect(wrapper.find('img').exists()).toBeFalsy();
  });

  test('Image exists when isMine is false', () => {
    const wrapper = mountChatBubbleComponent(MESSAGE, false, 'https://image.jpg');

    expect(wrapper.find('img').exists()).toBeTruthy();
    expect(wrapper.find('img').attributes('src')).toBe('https://image.jpg');
  });
});
