import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ICertificate } from '../../../app/models/certificate';
import { v4 as uuid } from 'uuid';
import CertificateStore from '../../../app/stores/certificateStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';


const CertificateCreateForm: React.FC<RouteComponentProps> = ({
  match,
  history
}) => {
  const certificateStore = useContext(CertificateStore);
  const {
    createCertificate,
    editCertificate,
    submitting,
    certificate: initialFormState,
    loadCertificate,
    clearCertificate
  } = certificateStore;

  const [certificate, setCertificate] = useState<ICertificate>({
    id: '',
    createdAt: '',
    updatedAt: '',
    name: '',
    category: '',
    level: '',
    description: '',
    remark: ''
  });

  const category = [
    { key: 'Induction', text: 'Induction', value: 'Induction' },
    { key: 'License', text: 'License', value: 'License' },
    { key: 'Certificate', text: 'Certificate', value: 'Certificate' },
    { key: 'Police Check', text: 'Police Check', value: 'Police Check' },
    { key: 'Enable Skill', text: 'Enable Skill', value: 'Enable Skill' },
    { key: 'Soft Skill', text: 'Soft Skill', value: 'Soft Skill' }
  ];

  const handleSubmit = () => {
      createCertificate(certificate).then(() => history.push(`/hrmanagement/certificate`));
  };


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setCertificate({ ...certificate, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Name'
          required
          onChange={handleInputChange}
          name='name'
          placeholder='Name'
          value={certificate.name}
        />
        <Form.Select
          label='Category'
          required
          width={2}
          onChange={(e, { name, value }) => setCertificate({ ...certificate, [name]: value })}
          options={category}
          name='category'
          placeholder='Category'
          value={certificate.category}
        />
        <Form.Input
          label='Level'
          onChange={handleInputChange}
          name='level'
          placeholder='Level'
          value={certificate.level}
        />
        <Form.Input
          label='Description'
          onChange={handleInputChange}
          name='description'
          placeholder='Description'
          value={certificate.description}
        />
        <Form.Input
          label='Remark'
          onChange={handleInputChange}
          name='remark'
          placeholder='Remark'
          value={certificate.remark}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/hrmanagement/certificate')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(CertificateCreateForm);
