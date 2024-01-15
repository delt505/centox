export default interface User {
    _id: string;
    id: string;
    username: string;
    avatar: string;
    createdAt: number,
    role?: string;
    owner?: boolean;      
}