export interface LoginCredentials {
    userName: string;
    password: string;
}

export interface User {
    id: number;
    userName: string;
}

export interface LoginResponse {
    success: boolean;
    message?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}