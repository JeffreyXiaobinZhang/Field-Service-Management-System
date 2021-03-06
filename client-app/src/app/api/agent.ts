import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';
import { history } from '../..';
import { IProject } from '../models/project';
import { IProjectTask } from '../models/projecttask';
import { ISORList } from '../models/sorlist';
import { ITechnician } from '../models/technician';
import { ITaskTechnician } from '../models/tasktechnician';
import { IProjectLog } from '../models/projectlog';
import { IWarehouse } from '../models/warehouse';
import { IInvoice } from '../models/invoice';
import {ITechnicianRate} from '../models/technicianrate';
import { IWarehouseLog } from '../models/warehouselog';
import { IProjectStock } from '../models/projectstock';
import { ICertificate } from '../models/certificate';
import { ITechnicianCertificate } from '../models/techniciancertificate';
import {IThirdparty} from '../models/thirdparty';
import {IProjectVendor} from '../models/projectvendor';
import {IFile} from '../models/file';
import {IPhotoRequest} from '../models/photorequest';
import {IProjectPhoto} from '../models/projectphoto';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
    config => {
      const token = window.localStorage.getItem('jwt');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
      toast.error('Network error - make sure API is running!');
    }
    const { status, data, config, headers } = error.response;
    if (status === 404) {
      history.push('/notfound');
    }
    if (status === 401 && headers['www-authenticate'] === 'Bearer error="invalid_token", error_description="The token is expired"') {
      window.localStorage.removeItem('jwt');
      history.push('/')
      toast.info('Your session has expired, please login again')
    }
    if (
      status === 400 &&
      config.method === 'get' &&
      data.errors.hasOwnProperty('id')
    ) {
      history.push('/notfound');
    }
    if (status === 500) {
      toast.error('Server error - check the terminal for more info!');
    }
    throw error.response;
  });

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(100)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(100)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(100)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(100)).then(responseBody), 
    postForm: (url: string, file: File[]) => {
      let formData = new FormData();
      for (let i = 0; i < file.length; i++) {
      formData.append('File', file[i]);
      }
      return axios
        .post(url, formData, {
          headers: { 'Content-type': 'multipart/form-data' }
        })
        .then(responseBody);
    }
};

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/login`, user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post(`/user/register`, user),
}

const Projects = {
    list: (): Promise<IProject[]> => requests.get('/projects'),
    listStatus: (status: string): Promise<IProject[]> => requests.get(`/projects/${status}`),
    details: (id: string) => requests.get(`/projects/${id}`),
    create: (project: IProject) => requests.post('/projects', project),
    update: (project: IProject) => requests.put(`/projects/${project.id}`, project),
    delete: (id: string) => requests.del(`/projects/${id}`)
}

const ProjectTasks = {
    list: (projectId: string): Promise<IProjectTask[]> => requests.get(`/projecttasks/${projectId}`),
    details: (id: string) => requests.get(`/projecttasks/${id}`),
    create: (projecttask: IProjectTask) => requests.post('/projecttasks', projecttask),
    update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
    delete: (id: string) => requests.del(`/projecttasks/${id}`)
}

const SORLists = {
    list: (): Promise<ISORList[]> => requests.get('/sorlists'),
    //details: (name: string) => requests.get(`/sorlists/${name}`),
    sort: (category: string): Promise<ISORList[]> => requests.get(`/sorlists/${category}`),
    create: (sorlist: ISORList) => requests.post('/sorlists', sorlist),
    update: (sorlist: ISORList) => requests.put(`/sorlists/${sorlist.name}`, sorlist),
    delete: (name: string) => requests.del(`/sorlists/${name}`)
}

const Technicians = {
    list: (): Promise<ITechnician[]> => requests.get('/technicians'),
    details: (id: string) => requests.get(`/technicians/${id}`),
    create: (technician: ITechnician) => requests.post('/technicians', technician),
    update: (technician: ITechnician) => requests.put(`/technicians/${technician.id}`, technician),
    delete: (id: string) => requests.del(`/technicians/${id}`)
}

const TaskAssignments = {
    list: (projectId: string): Promise<ITaskTechnician[]> => requests.get(`/taskassignments/${projectId}`),
    // details: (id: string) => requests.get(`/technicians/${id}`),
    // create: (technician: ITechnician) => requests.post('/technicians', technician),
    update: (tasktechnician: ITaskTechnician) => requests.put(`/taskassignments/${tasktechnician.projectId}`,tasktechnician),
    // delete: (id: string) => requests.del(`/technicians/${id}`)
}

const ProjectLogs = {
    list: (projectId: string): Promise<IProjectLog[]> => requests.get(`/projectlogs/${projectId}`),
    // details: (id: string) => requests.get(`/projecttasks/${id}`),
    create: (projectlog: IProjectLog) => requests.post('/projectlogs', projectlog),
    // update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
    delete: (id: string) => requests.del(`/projectlogs/${id}`)
}

const Warehouses = {
    list: (): Promise<IWarehouse[]> => requests.get('/warehouses'),
    details: (id: string) => requests.get(`/warehouses/${id}`),
    create: (warehouse: IWarehouse) => requests.post('/warehouses', warehouse),
    update: (warehouse: IWarehouse) => requests.put(`/warehouses/${warehouse.id}`, warehouse),
    delete: (id: string) => requests.del(`/warehouses/${id}`)
}

const Invoices = {
    list: (): Promise<IInvoice[]> => requests.get('/invoices'),
    details: (id: string) => requests.get(`/invoices/${id}`),
    create: (invoice: IInvoice) => requests.post('/invoices', invoice),
    update: (invoice: IInvoice) => requests.put(`/invoices/${invoice.id}`, invoice),
    delete: (id: string) => requests.del(`/invoices/${id}`)
}

const TechnicianRates = {
    list: (): Promise<ITechnicianRate[]> => requests.get('/technicianrates'),
    search: (email: string | undefined) : Promise<ITechnicianRate[]> => requests.get(`/technicianrates/${email}`),
    //details: (id: string) => requests.get(`/technicianrates/${id}`),
    create: (technicianrate: ITechnicianRate) => requests.post('/technicianrates', technicianrate),
    update: (technicianrate: ITechnicianRate) => requests.put(`/technicianrates/${technicianrate.id}`, technicianrate),
    delete: (id: string) => requests.del(`/technicianrates/${id}`)

}

const WarehouseLogs = {
    list: (projectId: string): Promise<IWarehouseLog[]> => requests.get(`/warehouselogs/${projectId}`),
    // details: (id: string) => requests.get(`/projecttasks/${id}`),
    create: (warehouselog: IWarehouseLog) => requests.post('/warehouselogs', warehouselog),
    // update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
    delete: (id: string) => requests.del(`/warehouselogs/${id}`)
}

const ProjectStocks = {
    list: (projectId: string): Promise<IProjectStock[]> => requests.get(`/projectstocks/${projectId}`),
    // details: (id: string) => requests.get(`/projecttasks/${id}`),
    // create: (projectlog: IProjectLog) => requests.post('/projectlogs', projectlog),
    // update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
    // delete: (id: string) => requests.del(`/projecttasks/${id}`)
}

const Certificates = {
    list: (): Promise<ICertificate[]> => requests.get('/certificates'),
    //details: (id: string) => requests.get(`/certificates/${id}`),
    sort: (category: string): Promise<ICertificate[]> => requests.get(`/certificates/${category}`),
    create: (certificate: ICertificate) => requests.post('/certificates', certificate),
    update: (certificate: ICertificate) => requests.put(`/certificates/${certificate.id}`, certificate),
    delete: (id: string) => requests.del(`/certificates/${id}`)
}

const TechnicianCertificates = {
    list: (): Promise<ITechnicianCertificate[]> => requests.get('/techniciancertificates'),
    search: (params: URLSearchParams): Promise<ITechnicianCertificate[]> =>
    axios.get('/techniciancertificates', {params: params}).then(responseBody),
    details: (id: string) => requests.get(`/techniciancertificates/${id}`),
    // create: (techniciancertificate: ITechnicianCertificate) => requests.post('/techniciancertificates', techniciancertificate),
    create: (techniciancertificate: ITechnicianCertificate[]) => requests.post('/techniciancertificates', techniciancertificate),
    update: (techniciancertificate: ITechnicianCertificate) => requests.put(`/techniciancertificates/${techniciancertificate.id}`, techniciancertificate),
    delete: (id: string) => requests.del(`/techniciancertificates/${id}`)
}

const ThirdParties = {
    list: (): Promise<IThirdparty[]> => requests.get('/ThirdParties'),
    sort: (type: string): Promise<IThirdparty[]> => requests.get(`/ThirdParties/${type}`),
    //details: (name: string) => requests.get(`/ThirdParties/${name}}`),
    create: (thirdparty: IThirdparty) => requests.post('/ThirdParties', thirdparty),
    update: (thirdparty: IThirdparty) => requests.put(`/ThirdParties/${thirdparty.companyName}`, thirdparty),
    delete: (name: string) => requests.del(`/ThirdParties/${name}`)
}

const ProjectVendors = {
    list: (projectId: string): Promise<IProjectVendor[]> => requests.get(`/projectvendors/${projectId}`),
    details: (id: string) => requests.get(`/projectvendors/${id}`),
    create: (projectvendor: IProjectVendor) => requests.post('/projectvendors', projectvendor),
    update: (projectvendor: IProjectVendor) => requests.put(`/projectvendors/${projectvendor.id}`, projectvendor),
    delete: (id: string) => requests.del(`/projectvendors/${id}`)
}

const Uploads = {
  uploadFile: (file: File[]): Promise<IFile> =>
    requests.postForm(`/files`, file),
}

const PhotoRequests = {
  list: (): Promise<IPhotoRequest[]> => requests.get('/photorequests'),
  details: (id: string) => requests.get(`/photorequests/${id}`),
  create: (photorequest: IPhotoRequest) => requests.post('/photorequests', photorequest),
  update: (photorequest: IPhotoRequest) => requests.put(`/photorequests/${photorequest.id}`, photorequest),
  delete: (id: string) => requests.del(`/photorequests/${id}`)
}

const ProjectPhotos = {
  list: (projectId: string): Promise<IProjectPhoto[]> => requests.get(`/projectphotos/${projectId}`),
  // details: (id: string) => requests.get(`/projecttasks/${id}`),
  create: (projectphoto: IProjectPhoto) => requests.post('/projectphotos', projectphoto),
  // update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
  delete: (id: string) => requests.del(`/projectphotos/${id}`)
}

export default {
    User,
    Projects,
    SORLists,
    ProjectTasks,
    Technicians,
    TaskAssignments,
    ProjectLogs,
    Warehouses,
    Invoices,
    TechnicianRates,
    WarehouseLogs,
    ProjectStocks,
    Certificates,
    TechnicianCertificates,
    ThirdParties,
    ProjectVendors,
    Uploads,
    PhotoRequests,
    ProjectPhotos
}