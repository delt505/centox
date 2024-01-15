import http from '../http';

export interface IDeleteWebhookResponse {
    message: string;
}


export default ( id: string | undefined | string[]): Promise<IDeleteWebhookResponse> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/webhooks/${id}`)
            .then(response => {
                if(response.status != 200) 
                    return reject(response.data)
                return resolve(response.data);
            })
            .catch(reject);
    });
}