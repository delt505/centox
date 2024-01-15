import Application from '../../types/application';
import http from '../http';

export interface IUserApplicationsResponse {
    applications?: Application[];
    message?: string;
}

export default (id: string | undefined | string[]): Promise<IUserApplicationsResponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/user/applications/${id}`)
            .then(response => resolve(response.data))
            .catch((error) => reject(error.response.data));
    });
}