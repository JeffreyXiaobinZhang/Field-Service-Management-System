import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, MouseEvent } from 'react';
import { ICertificate } from '../models/certificate';
import { toast } from 'react-toastify';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class CertificateStore {
  @observable certificateRegistry = new Map();
  @observable certificate: ICertificate | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get certificatesByName() {
    return Array.from(this.certificateRegistry.values()).sort(
      (a, b) => a.name.localeCompare(b.name))
    ;
  }

  @action loadCertificates = async () => {
    this.loadingInitial = true;
    try {
      const certificates = await agent.Certificates.list();
      runInAction('loading certificates', () => {
        certificates.forEach(certificate => {
          this.certificateRegistry.set(certificate.id, certificate);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load Certificate List error' ,() => {
        this.loadingInitial = false;
      })
      toast.error('load Certificate List error');
    }
  };

  @action loadCertificate = async (id: string) => {
    let certificate = this.getCertificate(id);
    if (certificate) {
      this.certificate = certificate;
    }
    // } else {
    //   this.loadingInitial = true;
    //   try {
    //     certificate = await agent.Certificates.details(id);
    //     runInAction('getting certificate',() => {
    //       this.certificate = certificate;
    //       this.loadingInitial = false;
    //     })
    //   } catch (error) {
    //     runInAction('get certificate error', () => {
    //       this.loadingInitial = false;
    //     })
    //     toast.error('get certificate error');
    //     console.log(error);
    //   }
    // }
  }

  @action loadCertificateCategory = async(category:string) => {
    try{
      const certificates = await agent.Certificates.sort(category);
      this.certificateRegistry.clear();
      runInAction('loading Certificates', () => {
        certificates.forEach(certificate=> {
          this.certificateRegistry.set(certificate.id, certificate);
        });
      });
    } catch(error) {
      runInAction('loading Certificates error', () => {
        this.loadingInitial = false;
      })
      toast.error('load Certificates error');
    }
  };

  @action clearCertificate = () => {
    this.certificate = null;
  }

  getCertificate = (id: string) => {
    return this.certificateRegistry.get(Number(id));
  }

  @action createCertificate = async (certificate: ICertificate) => {
    this.submitting = true;
    try {
      certificate.createdAt = new Date().toJSON();
      certificate.updatedAt = new Date().toJSON();
      await agent.Certificates.create(certificate);
      runInAction('create Techncian', () => {
    //    this.certificateRegistry.set(certificate.id, certificate);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create Certificate error', () => {
        this.submitting = false;
      })
      toast.error('create Certificate error');
      console.log(error);
    }
  };

  @action editCertificate = async (certificate: ICertificate) => {
    this.submitting = true;
    try {
      await agent.Certificates.update(certificate);
      runInAction('editing certificate', () => {
        this.certificateRegistry.set(certificate.id, certificate);
        this.certificate = certificate;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('edit certificate error', () => {
        this.submitting = false;
      })
      toast.error('edit certificate error');
      console.log(error);
    }
  };

  @action deleteCertificate = async (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Certificates.delete(id);
      runInAction('deleting Certificate', () => {
        this.certificateRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete Certificate error', () => {
        this.submitting = false;
        this.target = '';
      })
      toast.error('delete Certificate error');
      console.log(error);
    }
  }
}

export default createContext(new CertificateStore());
