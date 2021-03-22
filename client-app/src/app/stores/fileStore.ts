import { RootStore } from './rootStore';
import { observable, action, runInAction, computed, reaction } from 'mobx';
import { IFile } from '../models/file';
import agent from '../api/agent';
import { toast } from 'react-toastify';

export default class FileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  // @observable file = File;
  @observable uploadingFile = false;
  @observable fileRegistry = new Map();
  // @observable fileList: File[] = [];


  // @computed get isCurrentUser() {
  //   if (this.rootStore.userStore.user && this.profile) {
  //     return this.rootStore.userStore.user.username === this.profile.username;
  //   } else {
  //     return false;
  //   }
  // }
  @computed get filesByName() {
    return Array.from(this.fileRegistry.values()).sort(
      (a, b) => a.name.localeCompare(b.name))
    ;
  }

  @action uploadFile = async () => {
    this.uploadingFile = true;
    const file = Array.from(this.fileRegistry.values());
    if (file.length !== 0) 
    {
    try {
      const urls = await agent.Uploads.uploadFile(file);
      runInAction(() => {
        // urls.forEach(url => {
          // this.fileRegistry.set(urls.id, urls);
      // });
        this.uploadingFile = false;
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem uploading file');
      runInAction(() => {
        this.uploadingFile = false;
      });
    }
  }
  };

  @action addFile =  (files : File) => {
    if (files !== null) 
    {
       this.fileRegistry.set(files.name, files);
    }
  };

  @action deleteFile =  (name : string) => {
       this.fileRegistry.delete(name)
  };

}
