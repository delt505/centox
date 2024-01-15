import http from '../http';

export interface ICreateWebhookResponse {
    message: string;
}

export interface ICreateWebhookData {
    url: string;
    name: string;
    event: string;
}


export default ({ url, name, event }: ICreateWebhookData): Promise<ICreateWebhookResponse> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/webhooks`, { url, name, event })
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}