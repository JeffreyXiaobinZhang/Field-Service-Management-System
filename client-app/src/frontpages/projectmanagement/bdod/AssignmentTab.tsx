import React, { useContext, useState, FormEvent, useEffect } from 'react';
<<<<<<< HEAD
import { Tab, Grid, Popup, Button, Table, Label, Form, Input, Segment, Item, Dropdown } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import ProjectSOREditForm from './ProjectSOREditForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ProfileEditForm from './ProfileEditForm';
=======
import { Tab, Grid, Popup, Button, Table, Label, Form, Input, Segment, Item, Dropdown, Select } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import ProjectSOREditForm from './ProjectSOREditForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
import { observer } from 'mobx-react-lite';
import { IProjectTask } from '../../../app/models/projecttask';
import { ITaskAssignment } from '../../../app/models/taskassignment';
import { ITaskTechnician } from '../../../app/models/tasktechnician';
import { ITechnician } from '../../../app/models/technician';

const AssignmentTab = () => {
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
<<<<<<< HEAD
    assignTechnician,
    editProjectTask,
    selectProjectTask,
    loadTaskAssignments,
    tasktechniciansByCategory: tasktechniciansByCategory,
    techniciansByName: techniciansByName,
=======
    editProjectTask,
    selectProjectTask,
    loadTaskAssignments,
    assignTechnician,
    getTechnicianInfo,
    updateMember,
    tasktechniciansByCategory: tasktechniciansByCategory,
    techniciansByName: techniciansByName,
    tasktechnicianRegistry,
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
    submitting,
    editMode,
    target } = projectStore;

<<<<<<< HEAD

=======
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
  const technicianOptions = techniciansByName.map(function (tech) {
    var option = { "key": tech.name, "text": tech.name, "value": tech.name }
    return option;
  }
  );

<<<<<<< HEAD
  return (
    <Tab.Pane>
      <Segment clearing>

        <Form>
          <Form.Group>
=======
  const handleSubmit = () => {
    tasktechniciansByCategory.map(tt => (
      assignTechnician(tt)
    ));
  };

  return (
    <Tab.Pane clearing>
      {/* <Segment clearing> */}

        <Form onSubmit={handleSubmit}>

>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Item Category</Table.HeaderCell>
<<<<<<< HEAD
                  <Table.HeaderCell>Technician Name</Table.HeaderCell>
                  <Table.HeaderCell>Technician Email</Table.HeaderCell>
                  <Table.HeaderCell>Technician Type</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Action</Table.HeaderCell>
=======
                  <Table.HeaderCell>Technician Lead</Table.HeaderCell>
                  <Table.HeaderCell>Technician Email</Table.HeaderCell>
                  <Table.HeaderCell>Technician Type</Table.HeaderCell>
                  <Table.HeaderCell>Team Member</Table.HeaderCell>
                  <Table.HeaderCell>Remark</Table.HeaderCell>
                  {/* <Table.HeaderCell width={1}>Action</Table.HeaderCell> */}
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
                </Table.Row>
              </Table.Header>

              <Table.Body>

                {tasktechniciansByCategory.map(tasktechnician => (

                  <Table.Row key={tasktechnician.category}>
                    <Table.Cell>
                      <Popup
                        trigger={
                          <span>
                            {tasktechnician.category}
                          </span>
                        }
                        key={tasktechnician.category}
                        flowing hoverable
                      //   content={() => projecttasksByName.map(function (x) {
                      //     if ( x.itemCategory === tasktechnician.category) {
                      //       var name = x.itemName + ";    ";
                      //       return name;
                      //     }
                      //  })}
                      >
                        <Popup.Content>
                          <Table>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>Item Name</Table.HeaderCell>
                                <Table.HeaderCell>Item Description</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {projecttasksByName.map(sorname => (
                                (sorname.itemCategory === tasktechnician.category) &&
                                <Table.Row>
                                  <Table.Cell> {sorname.itemName} </Table.Cell>
                                  <Table.Cell> {sorname.itemDescription} </Table.Cell>
                                </Table.Row>

                              ))}
                            </Table.Body>
                          </Table>
                        </Popup.Content>

                      </Popup>
                    </Table.Cell>
                    <Table.Cell>
<<<<<<< HEAD
                      <Form.Select
                        required
                        onChange={(e) => assignTechnician(e, tasktechnician.projectId, tasktechnician.category, 'update').then(() => loadTaskAssignments(tasktechnician.projectId))}
=======
              
                      <Form.Select
                        required
                        // onChange={(e) => assignTechnician(e, tasktechnician.projectId, tasktechnician.category, 'update').then(() => loadTaskAssignments(tasktechnician.projectId))}
                        onChange={(e) => getTechnicianInfo(e, tasktechnician)}
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
                        options={technicianOptions}
                        search
                        name='techName'
                        placeholder='Name'
                        value={tasktechnician.techName}
                      />
<<<<<<< HEAD
=======
            
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
                    </Table.Cell>
                    <Table.Cell>{tasktechnician.techEmail}</Table.Cell>
                    <Table.Cell> {tasktechnician.techType}</Table.Cell>
                    <Table.Cell>
<<<<<<< HEAD

=======
                    <Form.Input
                    width={16}
          name='teamMember'
          value={tasktechnician.teamMember}
          onChange={(e, { name, value }) => updateMember(e, tasktechnician, name, value)}
        />
                       
                       </Table.Cell>
                    <Table.Cell> 
                    <Form.TextArea
          name='remark'
          rows={2}
          value={tasktechnician.remark || ''}
          onChange={(e, { name, value }) => updateMember(e, tasktechnician, name, value)}
        />
                    </Table.Cell>
                    {/* <Table.Cell>
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
                      <Button
                        name={tasktechnician.id}
                        size='mini'
                        // loading={target === tasktechnician.id && submitting}
                        onClick={(e) => assignTechnician(e, tasktechnician.projectId, tasktechnician.category, 'delete').then(() => loadTaskAssignments(tasktechnician.projectId))}
                        content='Delete'
                        color='red'
                      />
<<<<<<< HEAD
                    </Table.Cell>
=======
                    </Table.Cell> */}
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
<<<<<<< HEAD
          </Form.Group>
        </Form>


      </Segment>
=======
     
          <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
         </Form>


      {/* </Segment> */}
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6

    </Tab.Pane>
  );
};

export default observer(AssignmentTab);
