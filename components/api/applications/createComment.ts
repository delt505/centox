import http from '../http';

export interface ICommentApplicationResponse {
    message?: string;
}

export interface ICommentApplicationData {
    applicationId: string;
    comment: string;
}


export default ({ applicationId, comment }: ICommentApplicationData): Promise<ICommentApplicationResponse> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/applications/${applicationId}/comment`, { comment })
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}