import http from '../http';

export interface ICreateApplicationResponse {
    message: string;
    applicationId?: string;
}

export interface ICreateApplicationData {
    formId: string;
    answers: {
        [key: string]: string | boolean;
    };
}


export default ({ formId, answers }: ICreateApplicationData): Promise<ICreateApplicationResponse> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/applications/${formId}`, { answers})
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}