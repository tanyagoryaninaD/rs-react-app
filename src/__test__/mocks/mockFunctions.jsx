import { vi } from 'vitest';
import { mockStore } from './store';

export const dispatchSpy = vi.spyOn(mockStore, 'dispatch');

export const mockOnSearch = vi.fn();
export const mockOnChange = vi.fn();
export const mockOnUpdateState = vi.fn();
