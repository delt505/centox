import Form from '../../types/form';
import http from '../http';

export interface IUpdateFormResponse {
    message: string;
}


export default (form: Form): Promise<IUpdateFormResponse> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/forms/${form._id}`, { form })
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}