import http from '../http';

export interface IDeleteApplicationResponse {
    message?: string;
}


export default (applicationId: string): Promise<IDeleteApplicationResponse> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/applications/${applicationId}`)
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}