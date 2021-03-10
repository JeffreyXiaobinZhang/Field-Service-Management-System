import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, Modal } from 'semantic-ui-react';
import { ITechnicianCertificate } from '../../../app/models/techniciancertificate';
import TechnicianCertificateStore from '../../../app/stores/techniciancertificateStore';
import ModalStore from '../../../app/stores/modalStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';


const TechnicianCertificateCreateForm: React.FC<RouteComponentProps> = ({
  match,
  history
}) => {
  const techniciancertificateStore = useContext(TechnicianCertificateStore);
  const modalStore = useContext(ModalStore);
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

  const {
    openModal
  } = modalStore;

  useEffect(() => {
    loadTechnicians();
    loadCertificates();
  }, []);

  const [technician, setTechnician] = useState({
    technicianId: '',
    remark: ''
  });
  const [open, setOpen] = React.useState(true)
  const [certchecked, setCertificateChecked] = useState(new Map());

  const [expirydate, setExpiryDate] = useState(new Map());

  const technicianOptions = techniciansByName.map(function (tech) {
    var option = { "key": tech.id, "text": tech.name, "value": tech.id }
    return option;
  }
  );

  const handleSubmit = () => {
    let techniciancert: ITechnicianCertificate[] = new Array();
    certificatesByName.map(cert => {
      let techniciancertificate: ITechnicianCertificate =
    {
      id : '0',
      createdAt: '',
      updatedAt: '',
      technicianId: technician.technicianId,
      certificateId: '',
      expiryDate: '',
      remark: technician.remark
    };
      const selectcertificate = certchecked.get(cert.id);
      if (selectcertificate === true)
      {
        techniciancertificate.certificateId = cert.id;
        techniciancertificate.expiryDate = expirydate.get(cert.id);
        techniciancert.push(techniciancertificate);
      };
      
    })
    if(techniciancert.length !== 0) 
    createTechnicianCertificate(techniciancert).then(() => history.push(`/hrmanagement/techniciancertificate`));
  };


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setTechnician({ ...technician, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Select
          label='Name'
          required
          onChange={(e, { name, value }) => setTechnician({ ...technician, [name]: value })}
          options={technicianOptions}
          search
          name='technicianId'
          placeholder='Name'
          value={technician.technicianId}
        />
        <Grid>
        <Grid.Column width={5} as={Segment}>
         <h5> Enable Skill: </h5>
        {certificatesByName.map(certificate => (
          (certificate.category === 'Enable Skill') && <Form.Checkbox
            label={certificate.name}
            checked={certchecked.get(certificate.id)}
            onChange={(e, { checked }) => {
              setCertificateChecked(certchecked => certchecked.set(certificate.id, checked)); 
              if (certchecked.get(certificate.id) === undefined || certchecked.get(certificate.id)===true)
              openModal(
                <Form.Input
                  label='Expiry Date'
                  onChange={(e, { value }) => setExpiryDate(expirydate => expirydate.set(certificate.id, value))}
                  name='expiryDate'
                  type='date'
                  placeholder='Expiry Date'
                />
              )
            }}
            name={certificate.id}
          />
        ))}
        </Grid.Column>
        
        <Grid.Column width={2} as={Segment}>
        <h5> Soft Skill: </h5>
        {certificatesByName.map(certificate => (
          (certificate.category === 'Soft Skill') && <Form.Checkbox
            label={certificate.name}
            checked={certchecked.get(certificate.id)}
            onChange={(e, { checked }) => {
              setCertificateChecked(certchecked => certchecked.set(certificate.id, checked)); 
              if (certchecked.get(certificate.id) === undefined || certchecked.get(certificate.id)===true)
              openModal(
                <Form.Input
                  label='Expiry Date'
                  onChange={(e, { value }) => setExpiryDate(expirydate => expirydate.set(certificate.id, value))}
                  name='expiryDate'
                  type='date'
                  placeholder='Expiry Date'
                />
              )
            }}
            name={certificate.id}
          />
        ))}
        </Grid.Column>
        <Grid.Column width={2} as={Segment}>
        <h5> Induction:</h5>
        {certificatesByName.map(certificate => (
          (certificate.category === 'Induction') && <Form.Checkbox
            label={certificate.name}
            checked={certchecked.get(certificate.id)}
            onChange={(e, { checked }) => {
              setCertificateChecked(certchecked => certchecked.set(certificate.id, checked)); 
              if (certchecked.get(certificate.id) === undefined || certchecked.get(certificate.id)===true)
              openModal(
                <Form.Input
                  label='Expiry Date'
                  onChange={(e, { value }) => setExpiryDate(expirydate => expirydate.set(certificate.id, value))}
                  name='expiryDate'
                  type='date'
                  placeholder='Expiry Date'
                />
              )
            }}
            name={certificate.id}
          />
        ))}
        </Grid.Column>
        <Grid.Column width={2} as={Segment}>
        <h5>  License: </h5>
        {certificatesByName.map(certificate => (
          (certificate.category === 'License') && <Form.Checkbox
            label={certificate.name}
            checked={certchecked.get(certificate.id)}
            onChange={(e, { checked }) => {
              setCertificateChecked(certchecked => certchecked.set(certificate.id, checked)); 
              if (certchecked.get(certificate.id) === undefined || certchecked.get(certificate.id)===true)
              openModal(
                <Form.Input
                  label='Expiry Date'
                  onChange={(e, { value }) => setExpiryDate(expirydate => expirydate.set(certificate.id, value))}
                  name='expiryDate'
                  type='date'
                  placeholder='Expiry Date'
                />
              )
            }}
            name={certificate.id}
          />
        ))}
        </Grid.Column>
        <Grid.Column width={3} as={Segment}>
        <h5> Certificate: </h5>
        {certificatesByName.map(certificate => (
          (certificate.category === 'Certificate') && <Form.Checkbox
            label={certificate.name}
            checked={certchecked.get(certificate.id)}
            onChange={(e, { checked }) => {
              setCertificateChecked(certchecked => certchecked.set(certificate.id, checked)); 
              if (certchecked.get(certificate.id) === undefined || certchecked.get(certificate.id)===true)
              openModal(
                <Form.Input
                  label='Expiry Date'
                  onChange={(e, { value }) => setExpiryDate(expirydate => expirydate.set(certificate.id, value))}
                  name='expiryDate'
                  type='date'
                  placeholder='Expiry Date'
                />
              )
            }}
            name={certificate.id}
          />
        ))}
        </Grid.Column>
        <Grid.Column width={2} as={Segment}>
        <h5>  Police Check: </h5>
        {certificatesByName.map(certificate => (
          (certificate.category === 'Police Check') && <Form.Checkbox
            label={certificate.name}
            checked={certchecked.get(certificate.id)}
            onChange={(e, { checked }) => {
              setCertificateChecked(certchecked => certchecked.set(certificate.id, checked)); 
              if (certchecked.get(certificate.id) === undefined || certchecked.get(certificate.id)===true)
              openModal(
                <Form.Input
                  label='Expiry Date'
                  onChange={(e, { value }) => setExpiryDate(expirydate => expirydate.set(certificate.id, value))}
                  name='expiryDate'
                  type='date'
                  placeholder='Expiry Date'
                />
              )
            }}
            name={certificate.id}
          />
        ))}
        </Grid.Column>
        </Grid>
        <Form.Input
          label='Remark'
          onChange={handleInputChange}
          name='remark'
          placeholder='Remark'
          value={technician.remark}
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
