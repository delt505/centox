import User from '../../types/user';
import http from '../http';

export interface IUserResponse {
    user?: User;
    message?: string;
}

export default (id: string | undefined | string[]): Promise<IUserResponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/user/${id}`)
            .then(response => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}