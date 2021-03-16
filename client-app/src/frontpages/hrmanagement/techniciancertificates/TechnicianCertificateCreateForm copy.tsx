import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ITechnicianCertificate } from '../../../app/models/techniciancertificate';
import TechnicianCertificateStore from '../../../app/stores/techniciancertificateStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';


const TechnicianCertificateCreateForm: React.FC<RouteComponentProps> = ({
  match,
  history
}) => {
  const techniciancertificateStore = useContext(TechnicianCertificateStore);
  const {
    createTechnicianCertificate,
    editTechnicianCertificate,
    submitting,
    techniciancertificate: initialFormState,
    loadTechnicianCertificate,
    loadTechnicians,
    techniciansByName,
    loadCertificates,
    certificatesByName,
    clearTechnicianCertificate
  } = techniciancertificateStore;

  useEffect(() => {
    loadTechnicians();
    loadCertificates();
  }, []);

  const [techniciancertificate, setTechnicianCertificate] = useState<ITechnicianCertificate>({
    id: '',
    createdAt: '',
    updatedAt: '',
    technicianId: '',
    certificateId: '',
    expiryDate: '',
    remark: ''
  });

  const technicianOptions = techniciansByName.map(function (tech) {
    var option = { "key": tech.id, "text": tech.name, "value": tech.id }
    return option;
  }
  );

  const certificateOptions = certificatesByName.map(function (cert) {
    var option = { "key": cert.id, "text": cert.name, "value": cert.id }
    return option;
  }
  );

  const handleSubmit = () => {
    // createTechnicianCertificate(techniciancertificate).then(() => history.push(`/hrmanagement/techniciancertificate`));
  };


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setTechnicianCertificate({ ...techniciancertificate, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Select
          label='Name'
          required
          onChange={(e, { name, value }) => setTechnicianCertificate({ ...techniciancertificate, [name]: value })}
          options={technicianOptions}
          search
          name='technicianId'
          placeholder='Name'
          value={techniciancertificate.technicianId}
        />
        <Form.Select
          label='Certificate'
          required
          onChange={(e, { name, value }) => setTechnicianCertificate({ ...techniciancertificate, [name]: value })}
          options={certificateOptions}
          search
          name='certificateId'
          placeholder='Certificate'
          value={techniciancertificate.certificateId}
        />

        <Form.Input
          label='Expiry Date'
          onChange={handleInputChange}
          name='expiryDate'
          type='date'
          placeholder='Expiry Date'
          value={techniciancertificate.expiryDate}
        />
        <Form.Input
          label='Remark'
          onChange={handleInputChange}
          name='remark'
          placeholder='Remark'
          value={techniciancertificate.remark}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          onClick={() => history.push('/hrmanagement/techniciancertificate')}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(TechnicianCertificateCreateForm);
