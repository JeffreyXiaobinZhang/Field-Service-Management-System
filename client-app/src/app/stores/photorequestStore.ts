import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { IPhotoRequest } from '../models/photorequest';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class PhotoRequestStore {
  @observable photorequestRegistry = new Map();
  @observable photorequest: IPhotoRequest | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get photorequestsByItem() {
    return Array.from(this.photorequestRegistry.values()).sort(
      (a, b) => a.item.localeCompare(b.item))
    ;
  }

  @action loadPhotoRequests = async () => {
    this.loadingInitial = true;
    try {
      const photorequests = await agent.PhotoRequests.list();
      runInAction('loading photorequests', () => {
        photorequests.forEach(photorequest => {
          this.photorequestRegistry.set(photorequest.id, photorequest);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load PhotoRequest List error', () => {
        this.loadingInitial = false;
      })
      toast.error('load PhotoRequest List error');
    }
  };

  @action loadPhotoRequest = async (id: string) => {
    let photorequest = this.getPhotoRequest(id);
    if (photorequest) {
      this.photorequest = photorequest;
    } else {
      this.loadingInitial = true;
      try {
        photorequest = await agent.PhotoRequests.details(id);
        runInAction('getting photorequest',() => {
          this.photorequest = photorequest;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get photorequest error', () => {
          this.loadingInitial = false;
        })
        toast.error('get photorequest error');
        console.log(error);
      }
    }
  }

  @action clearPhotoRequest = () => {
    this.photorequest = null;
  }

  getPhotoRequest = (id: string) => {
    return this.photorequestRegistry.get(Number(id));
  }

  @action createPhotoRequest = async (photorequest: IPhotoRequest) => {
    this.submitting = true;
    try {
      await agent.PhotoRequests.create(photorequest);
      runInAction('create Photo Request', () => {
    //    this.photorequestRegistry.set(photorequest.id, photorequest);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create PhotoRequest error', () => {
        this.submitting = false;
      })
      toast.error('create PhotoRequest error');
      console.log(error);
    }
  };

  @action editPhotoRequest = async (photorequest: IPhotoRequest) => {
    this.submitting = true;
    try {
      await agent.PhotoRequests.update(photorequest);
      runInAction('editing photorequest', () => {
        this.photorequestRegistry.set(photorequest.id, photorequest);
        this.photorequest = photorequest;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('edit photorequest error', () => {
        this.submitting = false;
      })
      toast.error('edit photorequest error');
      console.log(error);
    }
  };

  @action deletePhotoRequest = async (id: string) => {
    this.submitting = true;
    this.target = id;
    try {
      await agent.PhotoRequests.delete(id);
      runInAction('deleting PhotoRequest', () => {
        this.photorequestRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete PhotoRequest error', () => {
        this.submitting = false;
        this.target = '';
      })
      toast.error('delete PhotoRequest error');
      console.log(error);
    }
  }
}

export default createContext(new PhotoRequestStore());
