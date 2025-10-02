import axios from 'axios';

export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 전역 에러 핸들링
apiClient.interceptors.response.use(
    response => response,
    error => {
        // 에러 처리 로직
        return Promise.reject(error);
    }
);