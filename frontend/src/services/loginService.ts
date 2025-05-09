import { LoginResponse } from '../types/login';

// ログイン関数
export const login = async (userName: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, password })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ログインエラー:', error);
    return { success: false, message: 'ネットワークエラーが発生しました' };
  }
};