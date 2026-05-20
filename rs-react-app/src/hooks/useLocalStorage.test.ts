import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('returns the stored value when localStorage has a value', () => {
    localStorage.setItem('test-key', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored');
  });

  it('updates the value and persists it to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', ''));
    act(() => {
      result.current[1]('new-value');
    });
    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('works with non-string types', () => {
    const { result } = renderHook(() => useLocalStorage<number>('num-key', 0));
    act(() => {
      result.current[1](42);
    });
    expect(result.current[0]).toBe(42);
    expect(localStorage.getItem('num-key')).toBe('42');
  });
});
