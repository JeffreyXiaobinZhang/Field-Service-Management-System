import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, MouseEvent } from 'react';
import { IProjectPhoto } from '../models/projectphoto';
import { toast } from 'react-toastify';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class PhotoUploadStore {
  @observable photouploadRegistry = new Map();
  @observable photoupload: IProjectPhoto | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get photouploadsByName() {
    return Array.from(this.photouploadRegistry.values()).sort(
      (a, b) => a.equipmentName.localeCompare(b.equipmentName))
    ;
  }

  @action loadPhotoUploads = async () => {
    this.loadingInitial = true;
    try {
      const technicians = await agent.Technicians.list();
      runInAction('loading technicians', () => {
        technicians.forEach(technician => {
          this.photouploadRegistry.set(technician.id, technician);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load Technician List error', () => {
        this.loadingInitial = false;
      })
      toast.error('load Technician List error');
    }
  };

  
}

export default createContext(new PhotoUploadStore());
