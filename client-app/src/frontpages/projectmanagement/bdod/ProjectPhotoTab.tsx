import React, { useContext, useState, FormEvent } from 'react';
import { Tab, Grid, Header, Button, Table, Label, Form, Input, Segment, Item, Select } from 'semantic-ui-react';
import ProjectStore from '../../../app/stores/projectStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { IProjectPhoto } from '../../../app/models/projectphoto';

const ProjectPhotoTab = () => {
  const projectStore = useContext(ProjectStore);
  const {
    projectphotosByName: projectphotosByName,
    project,
    deleteProject: deleteProject,
    loadProjectPhotos: loadProjectPhotos,
    createProjectPhoto,
    deleteProjectPhoto,
    techniciansByName,
    photorequestsByItem,
    technicianName,
    photorequestItem,
    photorequestType,
    photorequestActivity,
    technicianRegistry,
    sorlistsByName,
    submitting,
    editMode,
    target } = projectStore;

  const [projectphoto, setProjectPhoto] = useState<IProjectPhoto>({
    id: '',
    createdAt: '',
    updatedAt: '',
    projectId: project!.id,
    technicianId: '',
    photoRequestId: '',
    equipmentName: '',
    remark: ''
  });

  const technicianOptions = techniciansByName.map(function (tech) {
    var option = { key: tech.id, text: tech.name, value: tech.id };
    return option;
  });

  const photoOptions = photorequestsByItem.map(function (photo) {
    var option = { key: photo.id, text: `${photo.item}  \xa0\xa0\xa0\xa0  ${photo.activity}`, value: photo.id };
    return option;
  });

  const handleSubmit = () => {
      createProjectPhoto(projectphoto).then(() => loadProjectPhotos(projectphoto.projectId));
  };


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setProjectPhoto({ ...projectphoto, [name]: value });
  };

  return (
    <Tab.Pane>

      <Grid>
        <Grid.Column width={16}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Field inline >
                <label>Item Id</label>
                <Select
                  required
                  onChange={(e, { name, value }) => setProjectPhoto({ ...projectphoto, [name]: value })}
                  options={technicianOptions}
                  search
                  name='technicianId'
                  placeholder='Technician'
                  value={projectphoto.technicianId} />
              </Form.Field>
              <Form.Field inline >
                <label>Name</label>
                <Input
                  onChange={handleInputChange}
                  name='equipmentName'
                  placeholder='Equipment Name'
                  value={projectphoto.equipmentName} />
              </Form.Field>
              <Form.Field inline >
                <label>Item Id</label>
                <Select
                  required
                  onChange={(e, { name, value }) => setProjectPhoto({ ...projectphoto, [name]: value })}
                  options={photoOptions}
                  search
                  name='photoRequestId'
                  placeholder='Photo Request'
                  value={projectphoto.photoRequestId} />
              </Form.Field>
              <Button
                loading={submitting}
                floated='right'
                positive
                type='submit'
                content='Add'
              />
            </Form.Group>
          </Form>

        </Grid.Column>
      </Grid>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Technician</Table.HeaderCell>
            <Table.HeaderCell>Equipment Name</Table.HeaderCell>
            <Table.HeaderCell>Photo Item</Table.HeaderCell>
            <Table.HeaderCell>Photo Type</Table.HeaderCell>
            <Table.HeaderCell>Photo Activity</Table.HeaderCell>
            <Table.HeaderCell width={1}>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projectphotosByName.map(projectphoto => (

            <Table.Row key={projectphoto.id}>
              <Table.Cell>
                <Label>{technicianName.get(projectphoto.technicianId)}</Label>
              </Table.Cell>
              <Table.Cell>{projectphoto.equipmentName}</Table.Cell>
              <Table.Cell>{photorequestItem.get(projectphoto.photoRequestId)}</Table.Cell>
              <Table.Cell> {photorequestType.get(projectphoto.photoRequestId)}</Table.Cell>
              <Table.Cell>{photorequestActivity.get(projectphoto.photoRequestId)}</Table.Cell>
              <Table.Cell>
                <Button.Group size='mini'>
                  <Button
                    name={projectphoto.id}
                    size='mini'
                    loading={target === projectphoto.id && submitting}
                    onClick={(e) => deleteProjectPhoto(e, projectphoto.id)}
                    content='Delete'
                    color='red'
                  />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
   
    </Tab.Pane>
  );
};

export default observer(ProjectPhotoTab);
