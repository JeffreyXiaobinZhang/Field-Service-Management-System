import React, { useContext, useState, FormEvent } from 'react';
<<<<<<< HEAD
import { Tab, Grid, Header, Button, Table, Label, Form, Input, Segment, Item } from 'semantic-ui-react';
=======
import { Tab, Grid, Header, Button, Table, Label, Form, Input, Segment, Item, Dimmer } from 'semantic-ui-react';
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
import ProjectStore from '../../../app/stores/projectStore';
import ProjectSOREditForm from './ProjectSOREditForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';
import { IProjectLog } from '../../../app/models/projectlog';

const ProjectLogTab = () => {
  const projectStore = useContext(ProjectStore);
  const {
    projectsByDate: projectsByDate,
    projecttasksByName: projecttasksByName,
    project,
    selectedProjectTask,
    deleteProject: deleteProject,
    loadProjectTasks: loadProjectTasks,
    createProjectTask,
    deleteProjectTask,
    editProjectTask,
    selectProjectTask,
    loadProjectLogs,
    createProjectLog,
<<<<<<< HEAD
=======
    deleteProjectLog,
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
    projectlogsByDate,
    submitting,
    editMode,
    target } = projectStore;

  const [projectlog, setProjectLog] = useState<IProjectLog>({
    id: '',
    createdAt: '',
    updatedAt: '',
    projectId: project!.id,
    notes: ''
  });

  const handleSubmit = () => {
     !addMode && projectlog.notes && createProjectLog(projectlog).then(() => loadProjectLogs(projectlog.projectId));
  };

  const [addMode, setAddMode] = useState(false);

<<<<<<< HEAD
=======
  const [active, setDimmer] = useState({
    rowid: '',
    status: false
  });

>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProjectLog({ ...projectlog, [name]: value });
  };

  return (
    <Tab.Pane>

      <Grid>
        <Grid.Column width={16}>
          <Form onSubmit={handleSubmit}>
       
              <Button
                loading={submitting}
                floated='right'
                positive
                type='submit'
                content={addMode ? 'Submit' : 'Add'}
                onClick={() => setAddMode(!addMode)}
              />
              {addMode && 
            <Form.TextArea
            label='Notes'
            onChange={handleInputChange}
            name='notes'
            rows={2}
            placeholder='Notes'
            value={projectlog.notes}
          />
          }
   
          </Form>

        </Grid.Column>
      </Grid>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>Date</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projectlogsByDate.map(projectlog => (

            <Table.Row key={projectlog.id}>
<<<<<<< HEAD
              <Table.Cell>
                <Label>{projectlog.createdAt.substr(0,19)}</Label>
              </Table.Cell>
=======
              <Dimmer.Dimmable
                dimmed
                onMouseEnter={() => setDimmer({['rowid']: projectlog.id, ['status']: true })}
                onMouseLeave={() => setDimmer({['rowid']: projectlog.id, ['status']: false })}
              >
                <Table.Cell>
                  <Label>{projectlog.createdAt.substr(0, 19)}</Label>
                </Table.Cell>
                <Dimmer
                  active={(active.rowid === projectlog.id) && active.status}
                >
                  <Button
                  name={projectlog.id}
                  size='mini'
                  // loading={target === projectlog.id && submitting}
                  onClick={(e) => deleteProjectLog(e, projectlog.id)}
                  content='Delete'
                  color='red'
                />
                </Dimmer>
              </Dimmer.Dimmable>
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
              <Table.Cell>{projectlog.notes}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
   
    </Tab.Pane>
  );
};

export default observer(ProjectLogTab);
