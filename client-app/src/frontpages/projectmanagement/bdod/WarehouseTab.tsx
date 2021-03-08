import React, { useContext, useState, FormEvent } from 'react';
import { Tab, Grid, Header, Button, Table, Label, Form, Input, Segment, Item, Dimmer, Container } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import ProjectSOREditForm from './ProjectSOREditForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
// import ProfileEditForm from './ProfileEditForm';
import { observer } from 'mobx-react-lite';
import { IProjectLog } from '../../../app/models/projectlog';
import { IWarehouseLog } from '../../../app/models/warehouselog';

const WarehouseTab = () => {
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
    loadWarehouseLogs,
    techniciansByName,
    loadProjectStocks,
    createWarehouseLog,
    deleteWarehouseLog,
    technicianRegistry,
    warehouselogsByDate,
    warehouseOut,
    projectstocksByName,
    warehousesByPartNo,
    submitting,
    editMode,
    target } = projectStore;

  const initializeForm: IWarehouseLog = {
    id: '',
    createdAt: '',
    updatedAt: '',
    projectId: project!.id,
    orderNo: '',
    partNo: '',
    uom: '',
    quantity: 0,
    stock: 0,
    status: '',
    pickedBy: '',
    assignedTo: '',
    url: '',
    remark: ''
  };


  const [warehouselog, setWarehouseLog] = useState<IWarehouseLog>
    ({
      id: '',
      createdAt: '',
      updatedAt: '',
      projectId: project!.id,
      orderNo: '',
      partNo: '',
      uom: '',
      quantity: 0,
      stock: 0,
      status: '',
      pickedBy: '',
      assignedTo: '',
      url: '',
      remark: ''
    });

  const technicianOptions = techniciansByName.map(function (tech) {
    var option = { "key": tech.name, "text": tech.name, "value": tech.email }
    return option;
  }
  );

  const warehouseOptions = warehousesByPartNo.map(function (warehouse) {
    var option = { "key": warehouse.partNo, "text": warehouse.partNo, "value": warehouse.partNo }
    return option;
  }
  );

  const handleSubmit = (status: string) => {
    if (status === 'inbound') {
      // if (warehouselog.pickedBy) {
      //   const selectEmail = technicianRegistry.get(warehouselog.pickedBy);
      //   warehouselog.pickedBy = selectEmail.email;
      // }
      warehouselog.status = status;
      !addMode && warehouselog.partNo && createWarehouseLog(warehouselog).then(
        () => loadWarehouseLogs(warehouselog.projectId)).then(
          () => loadProjectStocks(warehouselog.projectId)).then(
            () => initializeForm && setWarehouseLog(initializeForm)
          );

    }
    else if (status === 'outbound') {
      projectstocksByName.map(log => {
        if (log.quantity > 0) {
          // let email = '';
          // if (log.assignedTo) {
          //   const selectEmail = technicianRegistry.get(log.assignedTo);
          //   email = selectEmail.email;
          // }
          const logoutbound: IWarehouseLog = {
            id: '',
            createdAt: '',
            updatedAt: '',
            projectId: log.projectId,
            orderNo: '',
            partNo: log.partNo,
            uom: '',
            quantity: log.quantity,
            stock: 0,
            status: status,
            pickedBy: '',
            assignedTo: log.assignedTo,
            url: '',
            remark: log.remark
          };
          createWarehouseLog(logoutbound).then(() => loadWarehouseLogs(log.projectId)).then(() => loadProjectStocks(log.projectId));
        }
      });
    }
  };

  const [addMode, setAddMode] = useState(false);

  const [active, setDimmer] = useState({
    rowid: '',
    status: false
  });

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setWarehouseLog({ ...warehouselog, [name]: value });
  };

  return (
    <Tab.Pane clearing>

      <Segment clearing>
        <Form onSubmit={(e) => handleSubmit('inbound')} >
          {addMode &&
            <Form.Group>
              <Form.Input
                label='Order No'
                required
                onChange={handleInputChange}
                name='orderNo'
                placeholder='Order No'
                value={warehouselog.orderNo}
              />
              <Form.Select
                required
                label='Part No'
                onChange={(e, { name, value }) => setWarehouseLog({ ...warehouselog, [name]: value })}
                options={warehouseOptions}
                search
                name='partNo'
                placeholder='Part No'
                value={warehouselog.partNo}
              />
              <Form.Input
                label='Quantity'
                onChange={handleInputChange}
                name='quantity'
                placeholder='Quantity'
                value={warehouselog.quantity}
              />
              <Form.Select
                required
                label='Picked By'
                onChange={(e, { name, value }) => setWarehouseLog({ ...warehouselog, [name]: value })}
                options={technicianOptions}
                search
                name='pickedBy'
                placeholder='Name'
                value={warehouselog.pickedBy}
              />
              <Form.Input
                label='Remark'
                onChange={handleInputChange}
                name='remark'
                placeholder='Remark'
                value={warehouselog.remark}
              />
            </Form.Group>
          }
          <Button
            loading={submitting}
            floated='right'
            positive
            type='submit'
            content={addMode ? 'Submit' : 'Add'}
            onClick={() => setAddMode(!addMode)}
          />
        </Form>
      </Segment>

      <Form onSubmit={(e) => handleSubmit('outbound')}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell >Part No</Table.HeaderCell>
              <Table.HeaderCell >Stock</Table.HeaderCell>
              <Table.HeaderCell >Assigned To</Table.HeaderCell>
              <Table.HeaderCell >Quantity</Table.HeaderCell>
              <Table.HeaderCell >Remark</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {projectstocksByName.map(projectstock => (

              <Table.Row key={projectstock.partNo}>
                <Table.Cell>
                  <Label>{projectstock.partNo}</Label>
                </Table.Cell>
                <Table.Cell>{projectstock.stock}</Table.Cell>
                <Table.Cell>

                  <Form.Select
                    required
                    onChange={(e, { name, value }) => warehouseOut(e, projectstock, name, '')}
                    options={technicianOptions}
                    search
                    name='assignedTo'
                    placeholder='Name'
                    value={projectstock.assignedTo}
                  />

                </Table.Cell>
                <Table.Cell>
                  <Form.Input
                    name='quantity'
                    value={projectstock.quantity}
                    onChange={(e, { name, value }) => warehouseOut(e, projectstock, name, value)}
                  //  onChange={(e, { name, value }) => updateMember(e, tasktechnician, name, value)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Input
                    name='remark'
                    value={projectstock.remark}
                    onChange={(e, { name, value }) => warehouseOut(e, projectstock, name, value)}
                  //  onChange={(e, { name, value }) => updateMember(e, tasktechnician, name, value)}
                  />
                </Table.Cell>
                {/* <Table.Cell>
                <Button.Group size='mini'>
                  <Button
                  // onClick={() => selectProjectTask(projecttask.id)}
                    size='mini'
                    content='Check-Out'
                    color='blue'
                  />
                </Button.Group>
              </Table.Cell> */}
              </Table.Row>
            ))}
          </Table.Body>

        </Table>
        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
      </Form>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Order No</Table.HeaderCell>
            <Table.HeaderCell>Part No</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Picked By</Table.HeaderCell>
            <Table.HeaderCell>Assigned To</Table.HeaderCell>
            <Table.HeaderCell>Remark</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {warehouselogsByDate.map(warehouselog => (
            <Table.Row key={warehouselog.id}>
              <Dimmer.Dimmable
                dimmed
                onMouseEnter={() => setDimmer({['rowid']: warehouselog.id, ['status']: true })}
                onMouseLeave={() => setDimmer({['rowid']: warehouselog.id, ['status']: false })}
              >
                <Table.Cell>
                  <Label>{warehouselog.createdAt.substr(0, 19)}</Label>
                </Table.Cell>
                <Dimmer
                  active={(active.rowid === warehouselog.id) && active.status}
                >
                  <Button
                  name={warehouselog.id}
                  size='mini'
                  // loading={target === projectlog.id && submitting}
                  onClick={(e) => deleteWarehouseLog(e, warehouselog.id).then(() => loadWarehouseLogs(warehouselog.projectId)).then(() => loadProjectStocks(warehouselog.projectId))}
                  content='Delete'
                  color='red'
                />
                </Dimmer>
              </Dimmer.Dimmable>
              <Table.Cell>{warehouselog.status}</Table.Cell>
              <Table.Cell>{warehouselog.orderNo}</Table.Cell>
              <Table.Cell>{warehouselog.partNo}</Table.Cell>
              <Table.Cell>{warehouselog.quantity}</Table.Cell>
              <Table.Cell>{warehouselog.pickedBy}</Table.Cell>
              <Table.Cell>{warehouselog.assignedTo}</Table.Cell>
              <Table.Cell>{warehouselog.remark}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Tab.Pane>
  );
};

export default observer(WarehouseTab);
