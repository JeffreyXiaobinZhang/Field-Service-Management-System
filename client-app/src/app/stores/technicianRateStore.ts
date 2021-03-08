import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { ITechnicianRate } from '../models/technicianrate';
import agent from '../api/agent';


configure({enforceActions: "always"});

class TechnicianRateStore{
    @observable technicianRateRegistry = new Map();
    @observable technicianRate: ITechnicianRate | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get technicianRatesByName(){
        return Array.from(this.technicianRateRegistry.values()).sort(
            (a, b) => Date.parse(a.name) - Date.parse(b.name)
        );
    }

    @action loadTechnicianRates = async () => {
        this.loadingInitial = true;
        try {
            const technicianRates = await agent.TechnicianRates.list();
            runInAction("loading technician rates", ()=> {
                technicianRates.forEach(rate => {
                    this.technicianRateRegistry.set(rate.id, rate);
                });
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction("load Technician Rate error", () => {
                this.loadingInitial = false;
            })
        }
    };

    // @action loadTechnicianRatesByEmail = async(email: string) => {
    //     this.loadingInitial = true;
    //     try {
    //         const technicianRates = await agent.TechnicianRates.list(email);
    //     }
        
    // }

    @action loadTechnicianRate = async (id: string) => {
        let technicianRate = this.getTechnicianRate(id);
        if(technicianRate){
            this.technicianRate = technicianRate
        } else {
            this.loadingInitial = true;
            try {
                technicianRate = await agent.TechnicianRates.details(id);
                runInAction("getting technician rate", () => {
                    this.technicianRate = technicianRate;
                    this.loadingInitial = false;
                })
            } catch(error){
                runInAction("get technician error", () => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }

    @action clearTechnicianRate = () => {
        this.technicianRate = null;
    }

    getTechnicianRate = (id: string) => {
        return this.technicianRateRegistry.get(id);
    }

    @action createTechnicianRate = async (technicianRate : ITechnicianRate) => {
        this.submitting = true;
        try {
            technicianRate.createdAt = new Date().toJSON();
            technicianRate.updatedAt = new Date().toJSON();
            await agent.TechnicianRates.create(technicianRate);
            runInAction("create technician rate", () => {
                this.submitting = false;
            })
        } catch(error) {
            runInAction("create technician rate error", () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action editTechnicianRate = async (technicianRate : ITechnicianRate) => {
        this.submitting = true;
        try {
            await agent.TechnicianRates.update(technicianRate);
            runInAction("editing technician rate", () => {
                console.log("success");
                this.technicianRateRegistry.set(technicianRate.id, technicianRate);
                this.technicianRate = technicianRate;
                this.submitting = false;
            })
        } catch (error){
            runInAction("edit technician error", () => {
                this.submitting = false;
            })
            console.log(error);
        }
    };

    @action deleteTechnicianRate = async(event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.TechnicianRates.delete(id);
            runInAction("deleting invoice", () => {
                this.technicianRateRegistry.delete(id);
                this.submitting = false;
                this.target = "";
            })
        } catch(error) {
            runInAction("delete invoice error", () => {
                this.submitting = false;
                this.target = "";
            })
            console.log(error);
        }
    }

}

export default createContext(new TechnicianRateStore());