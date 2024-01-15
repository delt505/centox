export default interface Webhook {
    _id: string;  
    name: string;
    url: string;
    event: 'all' | 'onComment' | 'onStatusUpdate';
    secret: string;
    createdAt: number;
}