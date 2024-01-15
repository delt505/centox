import http from '../http';

export default (): Promise<any> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/auth/logout`)
            .then(resolve)
            .catch(reject);
    });
}