import http from '../http';

export interface IDeleteFormResponse {
    message: string;
}


export default ( id: string | undefined | string[]): Promise<IDeleteFormResponse> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/forms/${id}`)
            .then(response => {
                if(response.status != 200) 
                    return reject(response.data)
                return resolve(response.data);
            })
            .catch(reject);
    });
}