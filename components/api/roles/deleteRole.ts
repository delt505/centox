import http from '../http';

export interface IDeleteRoleResponse {
    message: string;
}


export default ({ id }: { id: string }): Promise<IDeleteRoleResponse> => {
    return new Promise((resolve, reject) => {
        http.delete(`/api/roles/${id}`)
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}