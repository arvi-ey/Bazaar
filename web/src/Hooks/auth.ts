export function getAuth() {
    const token: string | null = localStorage.getItem('token');
    return token
}