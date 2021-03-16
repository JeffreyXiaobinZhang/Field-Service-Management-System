import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { ITechnician } from '../models/technician';
<<<<<<< HEAD
=======
import { toast } from 'react-toastify';
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
import agent from '../api/agent';

configure({enforceActions: 'always'});

class TechnicianStore {
  @observable technicianRegistry = new Map();
  @observable technician: ITechnician | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get techniciansByName() {
    return Array.from(this.technicianRegistry.values()).sort(
<<<<<<< HEAD
      (a, b) => Date.parse(a.name) - Date.parse(b.name)
    );
=======
      (a, b) => a.name.localeCompare(b.name))
    ;
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
  }

  @action loadTechnicians = async () => {
    this.loadingInitial = true;
    try {
      const technicians = await agent.Technicians.list();
      runInAction('loading technicians', () => {
        technicians.forEach(technician => {
          this.technicianRegistry.set(technician.id, technician);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load Technician List error', () => {
        this.loadingInitial = false;
      })
<<<<<<< HEAD
=======
      toast.error('load Technician List error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
    }
  };

  @action loadTechnician = async (id: string) => {
    let technician = this.getTechnician(id);
    if (technician) {
      this.technician = technician;
    } else {
      this.loadingInitial = true;
      try {
        technician = await agent.Technicians.details(id);
        runInAction('getting technician',() => {
          this.technician = technician;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get technician error', () => {
          this.loadingInitial = false;
        })
<<<<<<< HEAD
=======
        toast.error('get technician error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
        console.log(error);
      }
    }
  }

  @action clearTechnician = () => {
    this.technician = null;
  }

  getTechnician = (id: string) => {
    return this.technicianRegistry.get(id);
  }

  @action createTechnician = async (technician: ITechnician) => {
    this.submitting = true;
    try {
      technician.createdAt = new Date().toJSON();
      technician.updatedAt = new Date().toJSON();
      await agent.Technicians.create(technician);
      runInAction('create Techncian', () => {
<<<<<<< HEAD
=======
    //    this.technicianRegistry.set(technician.id, technician);
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create Technician error', () => {
        this.submitting = false;
      })
<<<<<<< HEAD
=======
      toast.error('create Technician error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
      console.log(error);
    }
  };

  @action editTechnician = async (technician: ITechnician) => {
    this.submitting = true;
    try {
      await agent.Technicians.update(technician);
      runInAction('editing technician', () => {
        this.technicianRegistry.set(technician.id, technician);
        this.technician = technician;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('edit technician error', () => {
        this.submitting = false;
      })
<<<<<<< HEAD
=======
      toast.error('edit technician error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
      console.log(error);
    }
  };

  @action deleteTechnician = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Technicians.delete(id);
      runInAction('deleting Technician', () => {
        this.technicianRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete Technician error', () => {
        this.submitting = false;
        this.target = '';
      })
<<<<<<< HEAD
=======
      toast.error('delete Technician error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
      console.log(error);
    }
  }
}

export default createContext(new TechnicianStore());
