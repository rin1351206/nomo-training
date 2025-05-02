import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todos, setTodos] = useState<any[]>([]);
  
  useEffect(() => {
    // APIからTodoリストを取得
    fetch('/api/todos/list')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error('Todoの取得に失敗しました:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Todoアプリケーション</h1>
        
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h2>Todoリスト</h2>
          {todos.length === 0 ? (
            <p>Todoがありません</p>
          ) : (
            <ul>
              {todos.map(todo => (
                <li key={todo.id}>
                  {todo.title} - 期限: {todo.deadline}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
