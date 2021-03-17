import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { ITechnicianCertificate } from '../models/techniciancertificate';
import { ITechnicianCertificateName } from '../models/techniciancertificatename';
import { ITechnician } from '../models/technician';
import { ICertificate } from '../models/certificate';
import { toast } from 'react-toastify';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class TechnicianCertificateStore {
  @observable techniciancertificateRegistry = new Map();
  @observable techniciancertificate: ITechnicianCertificate | null = null;
  @observable techniciancertificatenameRegistry = new Map();
  @observable techniciancertificatename: ITechnicianCertificateName | null = null;
  @observable technicianRegistry = new Map();
  @observable technician: ITechnician | null = null;
  @observable certificateRegistry = new Map();
  @observable certificate: ICertificate | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get techniciancertificatenamesByEmail() {
    return Array.from(this.techniciancertificatenameRegistry.values()).sort(
      (a, b) => a.name.localeCompare(b.name))
    ;
  }
  
  @computed get techniciansByName() {
    return Array.from(this.technicianRegistry.values()).sort(
      (a, b) => a.name.localeCompare(b.name))
    ;
  }

  @computed get certificatesByName() {
    return Array.from(this.certificateRegistry.values()).sort(
      (a, b) => a.name.localeCompare(b.name))
    ;
  }

  @action loadTechnicianCertificates = async () => {
    this.loadingInitial = true;
    try {
      const techniciancertificates = await agent.TechnicianCertificates.list();
      runInAction('loading techniciancertificates', () => {
        techniciancertificates.forEach(techniciancertificate => {
          this.techniciancertificateRegistry.set(techniciancertificate.id, techniciancertificate);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load TechnicianCertificate List error', () => {
        this.loadingInitial = false;
      })
      toast.error('load TechnicianCertificate List error');
    }
  };

  @action searchTechnicianCertificates = async (search : {technicianid: string, certone: string, certtwo: string, certthree: string, expiry: string}) => {
    const params = new URLSearchParams();
    params.append('technicianid', search.technicianid);
    params.append('certone', search.certone);
    params.append('certtwo', search.certtwo);
    params.append('certthree', search.certthree);
    params.append('expiry', search.expiry);

    this.loadingInitial = true;
    try {
      const techniciancertificatenames = await agent.TechnicianCertificates.search(params);
      this.techniciancertificatenameRegistry.clear();
      runInAction('loading techniciancertificates', () => {
        techniciancertificatenames.forEach(techniciancertificatename => {
          if (techniciancertificatename.expiryDate !== null)  techniciancertificatename.expiryDate = techniciancertificatename.expiryDate.substr(0,10);
          this.techniciancertificatenameRegistry.set(techniciancertificatename.id, techniciancertificatename);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load TechnicianCertificate List error', () => {
        this.loadingInitial = false;
      })
      toast.error('load TechnicianCertificate List error');
    }
  };

  @action loadTechnicianCertificate = async (id: string) => {
      this.loadingInitial = true;
      try {
        const techniciancertificatename = await agent.TechnicianCertificates.details(id);
        runInAction('getting techniciancertificate',() => {
          this.techniciancertificatenameRegistry.clear();
          this.techniciancertificatename = techniciancertificatename;
          if (techniciancertificatename.expiryDate !== null)  techniciancertificatename.expiryDate = techniciancertificatename.expiryDate.substr(0,10);
          this.techniciancertificatenameRegistry.set(techniciancertificatename.id, techniciancertificatename);
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get techniciancertificate error', () => {
          this.loadingInitial = false;
        })
        toast.error('get techniciancertificate error');
        console.log(error);
      }
    
  }

  @action clearTechnicianCertificate = () => {
    this.techniciancertificate = null;
  }

  getTechnicianCertificate = (id: string) => {
    return this.techniciancertificateRegistry.get(Number(id));
  }

  // @action createTechnicianCertificate = async (techniciancertificate: ITechnicianCertificate) => {
  //   this.submitting = true;
  //   try {
  //     techniciancertificate.createdAt = new Date().toJSON();
  //     techniciancertificate.updatedAt = new Date().toJSON();
  //     const techniciancertificatename = await agent.TechnicianCertificates.create(techniciancertificate);
  //     runInAction('create Techncian', () => {
  //       this.techniciancertificatenameRegistry.clear();
  //         this.techniciancertificatename = techniciancertificatename;
  //         if (techniciancertificatename.expiryDate !== null)  techniciancertificatename.expiryDate = techniciancertificatename.expiryDate.substr(0,10);
  //         this.techniciancertificatenameRegistry.set(techniciancertificatename.id, techniciancertificatename);
  //       this.submitting = false;
  //     })
  //   } catch (error) {
  //     runInAction('create TechnicianCertificate error', () => {
  //       this.submitting = false;
  //     })
  //     toast.error('create TechnicianCertificate error');
  //     console.log(error);
  //   }
  // };

  @action createTechnicianCertificate = async (techniciancertificate: ITechnicianCertificate[]) => {
    this.submitting = true;
    try {
      await agent.TechnicianCertificates.create(techniciancertificate);
      runInAction('create Techncian', () => {
        
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create TechnicianCertificate error', () => {
        this.submitting = false;
      })
      toast.error('create TechnicianCertificate error');
      console.log(error);
    }
  };

  @action editTechnicianCertificate = async (techniciancertificate: ITechnicianCertificate) => {
    this.submitting = true;
    try {
      await agent.TechnicianCertificates.update(techniciancertificate);
      runInAction('editing techniciancertificate', () => {
        this.techniciancertificateRegistry.set(techniciancertificate.id, techniciancertificate);
        this.techniciancertificate = techniciancertificate;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('edit techniciancertificate error', () => {
        this.submitting = false;
      })
      toast.error('edit techniciancertificate error');
      console.log(error);
    }
  };

  @action deleteTechnicianCertificate = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.TechnicianCertificates.delete(id);
      runInAction('deleting TechnicianCertificate', () => {
        this.techniciancertificateRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete TechnicianCertificate error', () => {
        this.submitting = false;
        this.target = '';
      })
      toast.error('delete TechnicianCertificate error');
      console.log(error);
    }
  }

  @action loadTechnicians = async () => {
    this.loadingInitial = true;
    try {
      const technicians = await agent.Technicians.list();
      this.technicianRegistry.clear();
      runInAction('loading technicians', () => {
        technicians.forEach(technician => {
          this.technicianRegistry.set(technician.name, technician);
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
    runInAction('load Certificate List error', () => {
      this.loadingInitial = false;
    })
    toast.error('load Certificate List error');
  }
};

}

export default createContext(new TechnicianCertificateStore());
