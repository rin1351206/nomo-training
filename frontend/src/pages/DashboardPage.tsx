import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <h1>ダッシュボード</h1>
            <p>ログインに成功しました！</p>
        </div>
    );
};

export default DashboardPage;