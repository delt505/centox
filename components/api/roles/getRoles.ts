import Role from '../../types/role';
import http from '../http';

export interface IRolesResponse {
    [key: string]: Role;
}


export default (): Promise<IRolesResponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/roles`)
            .then(response => {
                if(response.status != 200) 
                    return reject(new Error("Roles not loaded"))
                return resolve(response.data.roles);
            })
            .catch(reject);
    });
}