export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    fullName: string;
    isInstructor: boolean;
}

export interface TokenData {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}