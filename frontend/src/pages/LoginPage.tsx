import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/loginService';

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 入力検証
    if (!userName || !password) {
      setError('ユーザー名とパスワードを入力してください');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await login(userName, password);

      if (response.success) {
        navigate('/dashboard');
      } else {
        setError(response.message || 'ログインに失敗しました');
      }
    } catch (err) {
      setError('ログイン処理中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>sd</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">ユーザー名</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">パスワード</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'ログイン中...' : 'ログイン'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;