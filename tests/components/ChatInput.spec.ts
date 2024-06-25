import { mount } from '@vue/test-utils';
import ChatInput from '@/components/chat/ChatInput.vue';
import { describe, expect, test } from 'vitest';

describe('<ChatInput tests/>', () => {
  const wrapper = mount(ChatInput);
  const MESSAGE = 'Hello, World!';

  test('ChatInput renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('input[type="text"]').exists()).toBeTruthy();
    expect(wrapper.find('button').exists()).toBeTruthy();
    expect(wrapper.find('button svg').exists()).toBeTruthy();
  });

  test('message value is empty when enter pressed or button is clicked without message', async () => {
    await wrapper.find('input[type="text"]').trigger('keypress.enter');
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('sendMessage')).toBeFalsy();
  });

  test('emits sendMessage event when button is clicked with message value', async () => {
    await wrapper.find('input[type="text"]').setValue(MESSAGE);
    await wrapper.find('button').trigger('click');

    console.log(wrapper.emitted('sendMessage'));

    expect(wrapper.emitted('sendMessage')).toBeTruthy();
    expect(wrapper.emitted('sendMessage')).toHaveLength(1);
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([MESSAGE]);
    expect((wrapper.vm as any).message).toBe('');
  });

  test('emits sendMessage event when Enter key is pressed with message value', async () => {
    //we need to mount again to reset the state of the test (otherwise it would want: toHaveLength(1))
    const wrapper = mount(ChatInput);

    await wrapper.find('input[type="text"]').setValue(MESSAGE);
    await wrapper.find('input[type="text"]').trigger('keypress.enter');

    console.log(wrapper.emitted('sendMessage'));

    expect(wrapper.emitted('sendMessage')).toBeTruthy();
    expect(wrapper.emitted('sendMessage')).toHaveLength(1);
    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([MESSAGE]);
    expect((wrapper.vm as any).message).toBe('');
  });
});
