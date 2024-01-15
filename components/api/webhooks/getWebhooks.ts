
import Webhook from '../../types/webhook';
import http from '../http';

export interface IWebhooksResponse {
    message: string;
    webhooks?: [Webhook];
}


export default (): Promise<IWebhooksResponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/webhooks`)
            .then(response => {
                if(response.status != 200) 
                    return reject(response.data)
                return resolve(response.data);
            })
            .catch(reject);
    });
}