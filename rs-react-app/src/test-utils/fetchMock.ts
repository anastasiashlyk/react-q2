import { vi } from 'vitest';

export function mockFetchSuccess(data: unknown, status = 200): void {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status,
    json: () => Promise.resolve(data),
  } as Response);
}

export function mockFetchHttpError(status: number, statusText = ''): void {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status,
    statusText,
    json: () => Promise.resolve(null),
  } as unknown as Response);
}
