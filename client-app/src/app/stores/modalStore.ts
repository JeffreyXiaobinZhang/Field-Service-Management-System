import { observable, action, configure } from "mobx";
import { createContext } from 'react';
import { toast } from 'react-toastify';

configure({enforceActions: 'always'});

class ModalStore {
    @observable.shallow modal = {
        open: false,
        body: null
    }
    
    @action openModal = (content: any) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}

export default createContext(new ModalStore());