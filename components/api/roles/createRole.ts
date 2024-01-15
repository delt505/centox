import http from '../http';

export interface ICreateRoleResponse {
    message: string;
}

export interface ICreateRoleData {
    label: string;
    color: string;
    id?: string;
}


export default ({label, color, id}: ICreateRoleData): Promise<ICreateRoleResponse> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/roles`, {label, color, id})
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}