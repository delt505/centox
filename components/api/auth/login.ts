import http from '../http';

export interface ILoginReponse {
    message: string;
}

export interface ILoginData {
    code: string;
}

export default ({ code }: ILoginData): Promise<ILoginReponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/auth/login`, { params: { code } })
            .then(response => {
                if(response.status != 200) 
                    return reject(new Error("Login failed!"))
                return resolve(response.data.message);
            })
            .catch(reject);
    });
}