import Form from '../../types/form';
import http from '../http';

export interface IFormsResponse {
    message: string;
    forms?: [Form];
}


export default (): Promise<IFormsResponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/forms`)
            .then(response => {
                if(response.status != 200) 
                    return reject(response.data)
                return resolve(response.data);
            })
            .catch(reject);
    });
}