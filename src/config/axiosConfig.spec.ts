import { describe, it, expect, vi } from 'vitest';
import axiosInstance from './axiosConfig';
interface MockRequestConfig {
  headers: {
    Authorization?: string;
  };
}

let mockRequestConfig: MockRequestConfig = { headers: {} };

vi.mock('axios', () => {
  let mockRequestConfig: any = { headers: {} }; // Move inside vi.mock

  return {
    default: {
      create: vi.fn((config) => ({
        ...config,
        interceptors: {
          request: {
            use: vi.fn((callback) => {
              mockRequestConfig = callback({ headers: {} });
              return mockRequestConfig;
            }),
          },
          response: { use: vi.fn() },
        },
        get: vi.fn().mockResolvedValue({}),
      })),
    },
  };
});

describe('axiosInstance', () => {
  beforeEach(() => {
    localStorage.clear();
    mockRequestConfig = { headers: {} }; // Reset mock config before each test
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should not add Authorization header if tokens do not exist', async () => {
    await axiosInstance.get('/some-endpoint');

    expect(mockRequestConfig.headers.Authorization).toBeUndefined();
  });
});
