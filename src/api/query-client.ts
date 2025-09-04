import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // 不重试认证错误
        if (error?.message === 'Unauthorized') return false
        // 最多重试2次
        return failureCount < 2
      },
      staleTime: 5 * 60 * 1000, // 5分钟
      gcTime: 10 * 60 * 1000, // 10分钟 (原 cacheTime)
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})
