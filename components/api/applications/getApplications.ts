import Application from '../../types/application';
import http from '../http';

export interface IApplicationsResponse {
    message?: string;
    applications?: Application[];
    total?: number;
    pages?: number;
}

export interface IApplicationsData {
    page: number;
    status: string[] | string;
    formId: string;
}


export default ({ page, status, formId }: IApplicationsData): Promise<IApplicationsResponse> => {
    return new Promise((resolve, reject) => {
        http.get(`/api/applications/list/${formId}/${page}`, { params: { status } })
            .then(response => {
                if(response.status != 200) 
                    return reject(response.data)
                return resolve(response.data);
            })
            .catch((error) => reject(error.response.data));
    });
}