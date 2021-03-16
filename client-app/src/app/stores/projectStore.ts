import { observable, action, computed, configure, runInAction, reaction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IProject as IProject } from '../models/project';
import { IProjectTask as IProjectTask } from '../models/projecttask';
import { ITaskAssignment as ITaskAssignment } from '../models/taskassignment';
import { ITaskTechnician as ITaskTechnician } from '../models/tasktechnician';
import { ITechnician as ITechnician } from '../models/technician';
import { IProjectLog as IProjectLog } from '../models/projectlog';
import { ISORList } from '../models/sorlist';

import agent from '../api/agent';

configure({enforceActions: 'always'});

class ProjectStore {

  @observable projectRegistry = new Map();
  @observable project: IProject | null = null;
  @observable projecttaskRegistry = new Map();
  @observable projecttask: IProjectTask | null = null;
  @observable selectedProjectTask: IProjectTask | undefined;
  @observable taskassignmentRegistry = new Map();
  @observable taskassignment: ITaskAssignment | null = null;
  @observable tasktechnicianRegistry = new Map();
  @observable technician: ITechnician | null = null;
  @observable technicianRegistry = new Map();
  @observable tasktechnician: ITaskTechnician | null = null;
  @observable projectlogRegistry = new Map();
  @observable projectlog: IProjectLog | null = null;
  @observable sorlistRegistry = new Map();
  @observable sorlist: ISORList | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable editMode = false;
  @observable reload = false;


  @computed get projectsByDate() {
    return Array.from(this.projectRegistry.values()).sort(
      (a, b) => Date.parse(a.jobStartDate) - Date.parse(b.jobStartDate)
    );
  }

  @computed get projecttasksByName() {
    return Array.from(this.projecttaskRegistry.values()).sort(
      (a, b) => a.itemName - b.itemName
    );
  }

  @computed get tasktechniciansByCategory() {
    return Array.from(this.tasktechnicianRegistry.values()).sort(
      (a, b) => a.category - b.category
    );
  }

  @computed get techniciansByName() {
    return Array.from(this.technicianRegistry.values()).sort(
      (a, b) => Date.parse(a.name) - Date.parse(b.name)
    );
  }

  @computed get projectlogsByDate() {
    return Array.from(this.projectlogRegistry.values()).sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
  }

  @computed get sorlistsByName() {
    return Array.from(this.sorlistRegistry.values()).sort(
      (a, b) => Date.parse(a.name) - Date.parse(b.name)
    );
  }

  @action loadProjects = async () => {
    this.loadingInitial = true;
    try {
      const projects = await agent.Projects.list();
      runInAction('loading projects', () => {
        projects.forEach(project => {
    //      activity.jobStartDate = activity.jobStartDate.split('.')[0];
         project.jobStartDate = project.jobStartDate.substr(0,10);
         project.estimatedCompletionDate = project.estimatedCompletionDate.substr(0,10);
          this.projectRegistry.set(project.id, project);
        });
        console.log(this.projectRegistry);
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load projects error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadProject = async (id: string) => {
    let project = this.getProject(id);
    if (project) {
      this.project = project;
      console.log(project);
    } else {
      this.loadingInitial = true;
      try {
        project = await agent.Projects.details(id);
        runInAction('getting project',() => {
          this.project = project;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get project error', () => {
          this.loadingInitial = false;
        })
        console.log(error);
      }
    }
  }

  @action clearProject = () => {
    this.project = null;
  }

  getProject = (id: string) => {
    return this.projectRegistry.get(id);
  }

  @action loadProjectsStatus = async (event: SyntheticEvent<HTMLButtonElement>, status: string) => {
    this.loadingInitial = true;
   // const params  = new URLSearchParams({status: status});
    try {
    //  const activities = await agent.Projects.listStatus(params.toString());
     const projects = await agent.Projects.listStatus(status);
     this.projectRegistry.clear();
      runInAction('loading projects', () => {
        projects.forEach(project => {
          project.jobStartDate = project.jobStartDate.split('.')[0];
          this.projectRegistry.set(project.id, project);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load projects error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action createProject = async (project: IProject) => {
    this.submitting = true;
    try {
     // project.createdAt = new Date().toISOString();
     // project.updatedAt = new Date().toISOString();
      project.createdAt = new Date().toJSON();
      project.updatedAt = new Date().toJSON();

      await agent.Projects.create(project);
      runInAction('create project', () => {
        // this.projectRegistry.set(project.id, project);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create project error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action editProject = async (project: IProject) => {
    this.submitting = true;
    try {
     // project.updatedAt = new Date().toJSON();
      await agent.Projects.update(project);
      runInAction('editing project', () => {
        this.projectRegistry.set(project.id, project);
        this.project = project;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit project error', () => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  @action deleteProject = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Projects.delete(id);
      runInAction('deleting project', () => {
        this.projectRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete project error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }

@action loadProjectTasks = async (projectId: string) => {
  this.loadingInitial = true;
  this.reload = false;
  try {
    const projecttasks = await agent.ProjectTasks.list(projectId);
    runInAction('loading tasks', () => {
      projecttasks.forEach(projecttask => {
        this.projecttaskRegistry.set(projecttask.id, projecttask);
      });
      this.loadingInitial = false;
      this.reload = true;
    })
  } catch (error) {
    runInAction('load tasks error', () => {
      this.loadingInitial = false;
    })
  }
}

@action createProjectTask = async (projecttask: IProjectTask) => {
  this.submitting = true;
  try {
   // project.createdAt = new Date().toISOString();
   // project.updatedAt = new Date().toISOString();
    projecttask.createdAt = new Date().toJSON();
    projecttask.updatedAt = new Date().toJSON();

    await agent.ProjectTasks.create(projecttask);
    runInAction('create project SOR', () => {
   //    this.projecttaskRegistry.set(projecttask.id, projecttask);
      this.submitting = false;
    })
  } catch (error) {
    runInAction('create project error', () => {
      this.submitting = false;
    })
    console.log(error);
  }
};

@action deleteProjectTask = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
  this.submitting = true;
  this.reload = false;
  this.target = event.currentTarget.name;
  try {
    await agent.ProjectTasks.delete(id);
    runInAction('deleting project SOR', () => {
      this.projecttaskRegistry.delete(id);
      this.tasktechnicianRegistry.clear();
      this.submitting = false;
      this.reload = true;
      this.target = '';
    })
  } catch (error) {
    runInAction('delete project SOR error', () => {
      this.submitting = false;
      this.target = '';
    })
    console.log(error);
  }
}

@action editProjectTask = async (projecttask: IProjectTask) => {
  this.submitting = true;
  try {
   // project.updatedAt = new Date().toJSON();
    await agent.ProjectTasks.update(projecttask);
    runInAction('editing project SOR', () => {
      this.projecttaskRegistry.set(projecttask.id, projecttask);
      this.projecttask = projecttask;
      this.editMode = false;
      this.submitting = false;
    })

  } catch (error) {
    runInAction('edit project error', () => {
      this.submitting = false;
    })
    console.log(error);
  }
};

@action selectProjectTask = (id: string) => {
  this.selectedProjectTask = this.projecttaskRegistry.get(id);
  this.editMode = true;
};

@action cancelFormOpen = () => {
  this.editMode = false;
}



@action loadTaskAssignments = async (projectId: string) => {
  // this.loadingInitial = true;
  try {
    const tasktechnicians = await agent.TaskAssignments.list(projectId);
    runInAction('loading tasks', () => {
      tasktechnicians.forEach(tasktechnician => {
        this.tasktechnicianRegistry.set(tasktechnician.category, tasktechnician);
      });
      // this.loadingInitial = false;
    })

  } catch (error) {
    runInAction('load tasks error', () => {
      // this.loadingInitial = false;
    })
  }
}

@action loadTechnicians = async () => {
  this.loadingInitial = true;
  try {
    const technicians = await agent.Technicians.list();
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
  }
};

@action assignTechnician = async (event: SyntheticEvent<HTMLElement>, projectId: string, category: string, type: string) => {
  let email = '@'; 
  if (type === 'update') {
  const name = event.currentTarget.textContent;
  const selectEmail = this.technicianRegistry.get(name);
  email = selectEmail.email;
}

  this.submitting = true;
  try {
    // project.updatedAt = new Date().toJSON();
     await agent.TaskAssignments.update(projectId, category, email);
     runInAction('assigning technician', () => {
    //   this.tasktechnicianRegistry.set(category, tasktechnician);
      //  this.projecttask = projecttask;
       this.editMode = false;
       this.submitting = false;
     })
 
   } catch (error) {
     runInAction('edit project error', () => {
       this.submitting = false;
     })
     console.log(error);
   }
};

@action loadProjectLogs = async (projectId: string) => {
  // this.loadingInitial = true;
  try {
    const projectlogs = await agent.ProjectLogs.list(projectId);
    runInAction('loading tasks', () => {
      projectlogs.forEach(projectlog => {
        this.projectlogRegistry.set(projectlog.id, projectlog);
      });
      // this.loadingInitial = false;
    })

  } catch (error) {
    runInAction('load tasks error', () => {
      // this.loadingInitial = false;
    })
  }
}

@action createProjectLog = async (projectlog: IProjectLog) => {
  this.submitting = true;
  try {
   // project.createdAt = new Date().toISOString();
   // project.updatedAt = new Date().toISOString();
   projectlog.createdAt = new Date().toJSON();
   projectlog.updatedAt = new Date().toJSON();

    await agent.ProjectLogs.create(projectlog);
    runInAction('create project log', () => {
   //    this.projecttaskRegistry.set(projecttask.id, projecttask);
      this.submitting = false;
    })
  } catch (error) {
    runInAction('create project log error', () => {
      this.submitting = false;
    })
    console.log(error);
  }
};

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
  }
};

}

export default createContext(new ProjectStore());
