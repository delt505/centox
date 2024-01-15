import Application from '../../types/application';
import Form from '../../types/form';
import User from '../../types/user';
import http from '../http';

export interface IApplicationResponse {
    message?: string;
    application?: Application;
    form?: Form;
    user?: User;
}


export default (id: string | undefined | string[]): Promise<IApplicationResponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/applications/${id}`)
            .then(response => {
                if(response.status != 200) 
                    return reject(response.data)
                return resolve(response.data);
            })
            .catch((error) => reject(error.response.data));
    });
}