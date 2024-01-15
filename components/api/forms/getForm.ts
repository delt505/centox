import Form from '../../types/form';
import http from '../http';

export interface IFormResponse {
    message: string;
    form?: Form;
}


export default ( id: string | undefined | string[]): Promise<IFormResponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/forms/${id}`)
            .then(response => {
                if(response.status != 200) 
                    return reject(response.data)
                return resolve(response.data);
            })
            .catch(reject);
    });
}