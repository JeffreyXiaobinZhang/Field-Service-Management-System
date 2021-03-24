import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ISORList } from '../../../app/models/sorlist';
import { v4 as uuid } from 'uuid';
import SORListStore from '../../../app/stores/sorlistStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';


const SORListCreateForm: React.FC<RouteComponentProps> = ({
  match,
  history
}) => {
  const sorlistStore = useContext(SORListStore);
  const {
    createSORList,
    editSORList,
    submitting,
    sorlist: initialFormState,
    loadSORList,
    clearSORList
  } = sorlistStore;

  const [sorlist, setSORList] = useState<ISORList>({
    name: '',
    createdAt: '',
    updatedAt: '',
    jobType: '',
    category: '',
    description: '',
    unitRate: 0,
    type: '',
    uom: '',
    remark: ''
  });

  const typeOptions = [
    {key:'Fixed', text:'Fixed', value:'Fixed'},
    {key:'Variable', text:'Variable', value:'Variable'}
  ]
  
  const categoryOptions = [
    {key:'Civils', text:'Civils', value:'Civils'},
    {key:'Splicing', text:'Splicing', value:'Splicing'},
    {key:'Other', text:'Other', value:'Other'},
    {key:'External Hauling', text:'External Hauling', value:'External Hauling'},
    {key:'Internal cabling', text:'Internal cabling', value:'Internal cabling'},
  ]

  const handleSubmit = () => {
      createSORList(sorlist).then(() => history.push(`/dailymanagement/sorlist`));
  };


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setSORList({ ...sorlist, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Item Id'
          required
          onChange={handleInputChange}
          name='name'
          placeholder='Item Id'
          value={sorlist.name}
        />
        <Form.Input
          label='Job Type'
          required
          onChange={handleInputChange}
          name='jobType'
          placeholder='Job Type'
          value={sorlist.jobType}
        />
        <Form.Select
          label='Category'
          options={categoryOptions}
          onChange={(e, {name, value}) => setSORList({...sorlist, [name]:value})}
          name='category'
          placeholder='Category'
          value={sorlist.category}
        />
        <Form.TextArea
        label='Description'
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder='Description'
          value={sorlist.description}
        />
        <Form.Input
        label='Unit Rate'
        required
          onChange={handleInputChange}
          name='unitRate'
          placeholder='Unit Rate'
          value={sorlist.unitRate}
        />
        <Form.Select
          label='Type'
          onChange={(e, {name, value}) => setSORList({...sorlist, [name]: value})}
          name='type'
          options={typeOptions}
          placeholder='Type'
          value={sorlist.type}
        />
        <Form.Input
        label='UOM'
          onChange={handleInputChange}
          name='uom'
          placeholder='UOM'
          value={sorlist.uom}
        />
        <Form.Input
        label='Remark'
          onChange={handleInputChange}
          name='remark'
          placeholder='Remark'
          value={sorlist.remark}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/dailymanagement/sorlist')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(SORListCreateForm);
