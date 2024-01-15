import http from '../http';

export interface ICreateFormResponse {
    message: string;
}

export default (): Promise<ICreateFormResponse> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/forms/create`)
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}