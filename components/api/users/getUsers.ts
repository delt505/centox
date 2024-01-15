import User from '../../types/user';
import http from '../http';

export interface IUsersResponse {
    users: [User];
    total: number;
    pages: number;
}

export default (page: string | number): Promise<IUsersResponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/user/list/${page}`)
            .then(response => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}