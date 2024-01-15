import Role from '../../types/role';
import User from '../../types/user';
import http from '../http';

export interface IUpdateUserResponse {
    message: string;
}

export interface IUpdateUserData {
    user: User;
    roleId?: string;
}


export default ({ user, roleId }: IUpdateUserData): Promise<IUpdateUserResponse> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/user/${user._id}`, { roleId })
            .then(response => {
                if(response.status == 200) return resolve(response.data);
                return reject(response.data);
            })
            .catch(error => {
                return reject(error.response.data);
            });
    });
}