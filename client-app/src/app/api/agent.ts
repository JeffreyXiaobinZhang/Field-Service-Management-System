import axios, { AxiosResponse } from 'axios';
import { IProject } from '../models/project';
import { IProjectTask } from '../models/projecttask';
import { ISORList } from '../models/sorlist';
import { ITechnician } from '../models/technician';
import { ITaskTechnician } from '../models/tasktechnician';
import { IProjectLog } from '../models/projectlog';
import { IWarehouse } from '../models/warehouse';
import { IInvoice } from '../models/invoice';
import {ITechnicianRate} from '../models/technicianrate';
import { request } from 'http';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => axios.get(url).then(sleep(100)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(100)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(100)).then(responseBody),
    del: (url: string) => axios.delete(url).then(sleep(100)).then(responseBody) 
};

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
    details: (name: string) => requests.get(`/sorlists/${name}`),
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
    update: (projectId: string, category: string, techEmail: string) => requests.put(`/taskassignments/${projectId}/${category}/${techEmail}`,{}),
    // delete: (id: string) => requests.del(`/technicians/${id}`)
}

const ProjectLogs = {
    list: (projectId: string): Promise<IProjectLog[]> => requests.get(`/projectlogs/${projectId}`),
    // details: (id: string) => requests.get(`/projecttasks/${id}`),
    create: (projectlog: IProjectLog) => requests.post('/projectlogs', projectlog),
    // update: (projecttask: IProjectTask) => requests.put(`/projecttasks/${projecttask.id}`, projecttask),
    // delete: (id: string) => requests.del(`/projecttasks/${id}`)
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
    details: (id: string) => requests.get(`/technicianrates/${id}`),
    create: (technicianrate: ITechnicianRate) => requests.post('/technicianrates', technicianrate),
    update: (technicianrate: ITechnicianRate) => requests.put(`/technicianrates/${technicianrate.id}`, technicianrate),
    delete: (id: string) => requests.del(`/technicianrates/${id}`)

}

export default {
    Projects,
    SORLists,
    ProjectTasks,
    Technicians,
    TaskAssignments,
    ProjectLogs,
    Warehouses,
    Invoices,
    TechnicianRates
}