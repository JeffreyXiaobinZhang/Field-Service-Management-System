import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IPhotoRequest } from '../../../app/models/photorequest';
import { v4 as uuid } from 'uuid';
import PhotoRequestStore from '../../../app/stores/photorequestStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';


const PhotoRequestCreateForm: React.FC<RouteComponentProps> = ({
  match,
  history
}) => {
  const photorequestStore = useContext(PhotoRequestStore);
  const {
    createPhotoRequest,
    editPhotoRequest,
    submitting,
    photorequest: initialFormState,
    loadPhotoRequest,
    clearPhotoRequest
  } = photorequestStore;

  const [photorequest, setPhotoRequest] = useState<IPhotoRequest>({
    id: '',
    createdAt: '',
    updatedAt: '',
    item: '',
    type: '',
    activity: '',
    request: ''
  });

  const typeOptions = [
    {key:'Splicing', text:'Splicing', value:'Splicing'},
    {key:'External Hauling', text:'External Hauling', value:'External Hauling'},
    {key:'Internal cabling', text:'Internal cabling', value:'Internal cabling'},
    {key:'Civils', text:'Civils', value:'Civils'}
  ]

  const activityOptions = [
    {key:'Installation', text:'Installation', value:'Installation'},
    {key:'Re-entry', text:'Re-entry', value:'Re-entry'},
    {key:'Splicing', text:'Splicing', value:'Splicing'},
    {key:'Insertion', text:'Insertion', value:'Insertion'},
    {key:'Patching', text:'Patching', value:'Patching'},
    {key:'Cabling via conduit', text:'Cabling via conduit', value:'Cabling via conduit'},
    {key:'Cabling in ceiling', text:'Cabling in ceiling', value:'Cabling in ceiling'},
    {key:'Cabling on tray', text:'Cabling on tray', value:'Cabling on tray'},
    {key:'Cabling in riser', text:'Cabling in riser', value:'Cabling in riser'},
    {key:'Cable hauling', text:'Cable hauling', value:'Cable hauling'}
  ]

  const handleSubmit = () => {
      createPhotoRequest(photorequest).then(() => history.push(`/dailymanagement/photorequest`));
  };


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setPhotoRequest({ ...photorequest, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Item'
          required
          onChange={handleInputChange}
          name='item'
          placeholder='Item'
          value={photorequest.item}
        />
        <Form.Select
          label='Type'
          options={typeOptions}
          onChange={(e, {name, value}) => setPhotoRequest({...photorequest, [name]:value})}
          name='type'
          placeholder='Type'
          value={photorequest.type}
        />
        <Form.Select
          label='Activity'
          options={activityOptions}
          onChange={(e, {name, value}) => setPhotoRequest({...photorequest, [name]:value})}
          name='activity'
          placeholder='Activity'
          value={photorequest.activity}
        />
        <Form.Input
          label='Request'
          onChange={handleInputChange}
          name='request'
          placeholder='Request'
          value={photorequest.request}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/dailymanagement/photorequest')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(PhotoRequestCreateForm);
