import React, { useContext, useState, FormEvent, useEffect } from 'react';
import { Tab, Grid, Popup, Button, Table, Label, Form, Input, Segment, Item, Dropdown } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import ProjectSOREditForm from './ProjectSOREditForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ProfileEditForm from './ProfileEditForm';
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
    assignTechnician,
    editProjectTask,
    selectProjectTask,
    loadTaskAssignments,
    tasktechniciansByCategory: tasktechniciansByCategory,
    techniciansByName: techniciansByName,
    submitting,
    editMode,
    target } = projectStore;


  const technicianOptions = techniciansByName.map(function (tech) {
    var option = { "key": tech.name, "text": tech.name, "value": tech.name }
    return option;
  }
  );

  return (
    <Tab.Pane>
      <Segment clearing>

        <Form>
          <Form.Group>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Item Category</Table.HeaderCell>
                  <Table.HeaderCell>Technician Name</Table.HeaderCell>
                  <Table.HeaderCell>Technician Email</Table.HeaderCell>
                  <Table.HeaderCell>Technician Type</Table.HeaderCell>
                  <Table.HeaderCell width={1}>Action</Table.HeaderCell>
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
                      <Form.Select
                        required
                        onChange={(e) => assignTechnician(e, tasktechnician.projectId, tasktechnician.category, 'update').then(() => loadTaskAssignments(tasktechnician.projectId))}
                        options={technicianOptions}
                        search
                        name='techName'
                        placeholder='Name'
                        value={tasktechnician.techName}
                      />
                    </Table.Cell>
                    <Table.Cell>{tasktechnician.techEmail}</Table.Cell>
                    <Table.Cell> {tasktechnician.techType}</Table.Cell>
                    <Table.Cell>

                      <Button
                        name={tasktechnician.id}
                        size='mini'
                        // loading={target === tasktechnician.id && submitting}
                        onClick={(e) => assignTechnician(e, tasktechnician.projectId, tasktechnician.category, 'delete').then(() => loadTaskAssignments(tasktechnician.projectId))}
                        content='Delete'
                        color='red'
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Form.Group>
        </Form>


      </Segment>

    </Tab.Pane>
  );
};

export default observer(AssignmentTab);
