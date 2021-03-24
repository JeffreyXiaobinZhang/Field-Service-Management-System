import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import {IThirdparty} from '../../../app/models/thirdparty';
import ThirdStore from '../../../app/stores/ThirdStore';

interface DetailParams {
  name:string;
}

const Thirdedit: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const thirdStore0 = useContext(ThirdStore);
  const {
    createThirdParty,
    editThirdParty,
    submitting,
    thirdparty: initialFormState,
    loadThirdParty,
    clearThirdParty
  } = thirdStore0;

  const [thirdparty, setThirdParty] = useState<IThirdparty>({
    id: '',
    createdAt: '',
    updatedAt: '',
    companyName: '',
    status: '',
    type: '',
    contactPerson: '',
    phone:'',
    email:'',
    project:''
  });
   
  useEffect(() => {
    loadThirdParty(match.params.name).then(
      () => initialFormState && setThirdParty(initialFormState)
    );

    return () => {
      clearThirdParty()
    }}, []);

  const handleSubmit = () => { 
  editThirdParty(thirdparty).then(() => history.push(`/dailymanagement/third`));
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setThirdParty({ ...thirdparty, [name]: value });
  };

  const typeOpt = [
    {key:'EWP',text:'EWP',value:'EWP'},
    {key:'Security',text:'Security',value:'Security'},
    {key:'Building management',text:'Building management',value:'Building management'},
    {key:'customer',text:'customer',value:'customer'},
  ]
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Company Name'
          // onChange={handleInputChange}
          name='companyName'
          placeholder={thirdparty.companyName}
          readOnly
          // value={thirdparty.companyName}
        />
        <Form.Select
          fluid
          label='Type'
          options = {typeOpt}
          placeholder='Type'
          onChange = {(e,{name,value}) => setThirdParty({...thirdparty,[name]:value})}
          name = 'type'
          value = {thirdparty.type}
        />

        <Form.Input
          label='Contact Person'
          onChange={handleInputChange}
          name='contactPerson'
          placeholder='ContactPerson'
          value={thirdparty.contactPerson}
        />
        <Form.Input
          label='Phone'
          onChange={handleInputChange}
          name='phone'
          placeholder='Phone'
          value={thirdparty.phone}
        />
        <Form.Input
          label='Email'
          onChange={handleInputChange}
          name='email'
          placeholder='Email'
          value={thirdparty.email}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/dailymanagement/third')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(Thirdedit);
