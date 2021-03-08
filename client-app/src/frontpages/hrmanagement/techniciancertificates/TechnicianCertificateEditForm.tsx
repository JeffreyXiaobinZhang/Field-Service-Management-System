import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ITechnicianCertificate } from '../../../app/models/techniciancertificate';
import { v4 as uuid } from 'uuid';
import TechnicianCertificateStore from '../../../app/stores/techniciancertificateStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

interface DetailParams {
  id: string;
  technicianId: string;
  certificateId: string;
  expiryDate: string;
  remark: string;
}

const TechnicianCertificateEditForm: React.FC<RouteComponentProps<DetailParams>> = ({
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
    loadTechnicianCertificates,
    loadCertificates,
    certificatesByName,
    clearTechnicianCertificate
  } = techniciancertificateStore;

  useEffect(() => {
    loadCertificates();
    loadTechnicians();
  
    return () => {
      clearTechnicianCertificate()
    }
  }, []);

  const [techniciancertificate, setTechnicianCertificate] = useState<ITechnicianCertificate>({
    id: match.params.id,
    createdAt: '',
    updatedAt: '',
    technicianId: match.params.technicianId,
    certificateId: match.params.certificateId,
    expiryDate: match.params.expiryDate,
    remark: match.params.remark
  });

  const certificateOptions = certificatesByName.map(function (cert) {
    var option = { "key": cert.name, "text": cert.name, "value": cert.id.toString() }
    return option;
  }
  );
  
  const technicianOptions = techniciansByName.map(function (tech) {
    var option = { "key": tech.id, "text": tech.name, "value": tech.id }
    return option;
  }
  );

  const handleSubmit = () => { 
     editTechnicianCertificate(techniciancertificate).then(() => loadTechnicianCertificate(techniciancertificate.id)).then(() => history.push(`/hrmanagement/techniciancertificate`));
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
          value={parseInt(techniciancertificate.technicianId)}
        />
        <Form.Select
          label='Certificate'
          // required
          onChange={(e, { name, value }) => setTechnicianCertificate({ ...techniciancertificate, [name]: value })}
          options={certificateOptions}
          search
          // text={certificatename}
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

export default observer(TechnicianCertificateEditForm);
