import { describe, expect, test, vi } from 'vitest';
import { useChat } from '@/composables/useChat';

describe('composables/useChat', () => {
  test('add message correctly when onMessage is called with text ending with ?', async () => {
    // Arrange
    const { messages, onMessage } = useChat();
    const TEXT = 'Hello, how are you?';

    // Act
    await onMessage(TEXT);
    const [firstMessage, secondMessage] = messages.value;

    // Assert
    expect(messages.value[0].isMine).toBe(true);
    expect(messages.value[1].isMine).toBe(false);
    expect(messages.value[0].message).toBe(TEXT);
    expect(firstMessage.message).toBe(TEXT);
    expect(secondMessage.isMine).toBeFalsy();
    expect(messages.value.length).toBe(2);
    expect(secondMessage).toEqual({
      id: expect.any(Number),
      image: expect.any(String),
      isMine: false,
      message: expect.any(String),
    });
  });

  test('add message correctly when onMessage is called with text NOT ending with ?', async () => {
    // Arrange
    const { messages, onMessage } = useChat();
    const TEXT = 'Hello';

    // Act
    await onMessage(TEXT);

    // Assert
    expect(messages.value[0].isMine).toBe(true);
    expect(messages.value[0].message).toBe(TEXT);
    expect(messages.value.length).toBe(1);
    expect(messages.value[0]).toEqual({
      id: expect.any(Number),
      isMine: true,
      message: TEXT,
    });
  });

  test('add nothing if text is empty', async () => {
    // Arrange
    const { messages, onMessage } = useChat();
    const TEXT = '';

    // Act
    await onMessage(TEXT);

    // Assert
    expect(messages.value.length).toBe(0);
    expect(messages.value).toEqual([]);
  });

  test('mock response - fetch api', async () => {
    // Arrange
    const mockResponse = {
      answer: 'yes',
      image: 'https://yesno.wtf/assets/yes/5f9b7c5d9d0b7e8c1c0e9b9b.gif',
    };

    console.log(window.fetch); //[Function: fetch]
    (window as any).fetch = vi.fn(async () => ({
      json: async () => mockResponse,
    }));

    const { messages, onMessage } = useChat();
    const TEXT = 'Hello?';

    // Act
    await onMessage(TEXT);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const [, secondMessage] = messages.value;

    console.log(secondMessage);
    expect(secondMessage).toEqual({
      id: expect.any(Number),
      image: mockResponse.image,
      isMine: false,
      message: mockResponse.answer,
    });
  });
});
