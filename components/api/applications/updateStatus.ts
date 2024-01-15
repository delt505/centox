import http from '../http';

export interface IUpdateApplicationResponse {
    message?: string;
}

export interface IUpdateApplicationData {
    applicationId: string;
    status: string;
}


export default ({ applicationId, status }: IUpdateApplicationData): Promise<IUpdateApplicationResponse> => {
    return new Promise((resolve, reject) => {
        http.put(`/api/applications/${applicationId}/status`, { status })
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}