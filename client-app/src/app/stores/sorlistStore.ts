import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext,  MouseEvent } from 'react';
import { ISORList } from '../models/sorlist';
import { toast } from 'react-toastify';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class SORListStore {
  @observable sorlistRegistry = new Map();
  @observable sorlist: ISORList | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get sorlistsByName() {
    return Array.from(this.sorlistRegistry.values()).sort(
      (a, b) => a.name.localeCompare(b.name))
    ;
  }

  @action loadSORLists = async () => {
    this.loadingInitial = true;
    try {
      const sorlists = await agent.SORLists.list();
      runInAction('loading sorlists', () => {
        sorlists.forEach(sorlist => {
          this.sorlistRegistry.set(sorlist.name, sorlist);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load SOR List error', () => {
        this.loadingInitial = false;
      })
      toast.error('load SOR List error');
    }
  };

  @action loadSORList = async (name: string) => {
    let sorlist = this.getSORList(name);
    if (sorlist) {
      this.sorlist = sorlist;
    } else {
      this.loadingInitial = true;
      try {
        sorlist = await agent.SORLists.details(name);
        runInAction('getting sorlist',() => {
          this.sorlist = sorlist;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get sorlist error', () => {
          this.loadingInitial = false;
        })
        toast.error('get sorlist error');
        console.log(error);
      }
    }
  }

  @action clearSORList = () => {
    this.sorlist = null;
  }

  getSORList = (name: string) => {
    return this.sorlistRegistry.get(name);
  }

  @action createSORList = async (sorlist: ISORList) => {
    this.submitting = true;
    try {
      sorlist.createdAt = new Date().toJSON();
      sorlist.updatedAt = new Date().toJSON();
      await agent.SORLists.create(sorlist);
      runInAction('create SOR', () => {
        this.sorlistRegistry.set(sorlist.name, sorlist);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create SOR error', () => {
        this.submitting = false;
      })
      toast.error('create SOR error');
      console.log(error);
    }
  };

  @action editSORList = async (sorlist: ISORList) => {
    this.submitting = true;
    try {
      await agent.SORLists.update(sorlist);
      runInAction('editing sorlist', () => {
        this.sorlistRegistry.set(sorlist.name, sorlist);
        this.sorlist = sorlist;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('edit sorlist error', () => {
        this.submitting = false;
      })
      toast.error('edit sorlist error');
      console.log(error);
    }
  };

  @action deleteSORList = async (event: MouseEvent<HTMLAnchorElement>, name: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.SORLists.delete(name);
      runInAction('deleting SOR', () => {
        this.sorlistRegistry.delete(name);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete SOR error', () => {
        this.submitting = false;
        this.target = '';
      })
      toast.error('delete SOR error');
      console.log(error);
    }
  }
}

export default createContext(new SORListStore());
