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

// ログアウト関数
export const logout = async (): Promise<LoginResponse> => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ログアウトエラー:', error);
    return { success: false, message: 'ネットワークエラーが発生しました' };
  }
};