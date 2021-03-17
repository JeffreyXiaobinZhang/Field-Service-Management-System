import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { ITechnicianRate } from '../../../app/models/technicianrate';
import TechnicianRateStore from '../../../app/stores/technicianRateStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { v4 as uuid } from 'uuid';

const TechnicianRateCreateForm : React.FC<RouteComponentProps> = ({
    match,
    history
}) => {
    const technicianRateStore =  useContext(TechnicianRateStore);
    const {
        createTechnicianRate,
        editTechnicianRate,
        submitting,
        technicianRate: initialFormState,
        loadTechnicianRate,
        clearTechnicianRate
    } = technicianRateStore;

    const [technicianRate, setTechnicianRate] = useState<ITechnicianRate>({
        id: '',
        createdAt: '',
        updatedAt: '',
        email: '',
        jobType: '',
        itemName: '',
        description:'',
        category: '',
        unitRate:'',
        uom: '',
        remark: ''
    });

    const handleSubmit = () => {
        createTechnicianRate(technicianRate).then(() => history.push(`/hrmanagement/technicianrate`));
    }

    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = event.currentTarget;
            setTechnicianRate({...technicianRate, [name]: value});
        };

        return (
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label='Technician Email'
              required
              onChange={handleInputChange}
              name='email'
              placeholder='Technician Email'
              value={technicianRate.email}
            />
            <Form.Input
              label='Job Type'
              required
              onChange={handleInputChange}
              name='jobType'
              placeholder='Job Type'
              value={technicianRate.jobType}
            />
            <Form.Input
              label='Item Name'
              required
              onChange={handleInputChange}
              name='itemName'
              placeholder='Item Name'
              value={technicianRate.itemName}
            />
            <Form.Input
              label='Description'
              required
              onChange={handleInputChange}
              name='description'
              placeholder='Description'
              value={technicianRate.description}
            />
            <Form.Input
              label='Category'
              onChange={handleInputChange}
              name='category'
              placeholder='Category'
              value={technicianRate.category}
            />
            <Form.TextArea
            label='Unit Rate'
              onChange={handleInputChange}
              name='unitRate'
              rows={2}
              placeholder='Unit Rate'
              value={technicianRate.unitRate}
            />
            <Form.Input
            label='UOM'
            required
              onChange={handleInputChange}
              name='uom'
              placeholder='UOM'
              value={technicianRate.uom}
            />
            <Form.Input
            label='Remark'
              onChange={handleInputChange}
              name='remark'
              placeholder='Remark'
              value={technicianRate.remark}
            />

            <Button
              loading={submitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              onClick={() => history.push('/hrmanagement/technicianrate')}
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        </Segment>
        )
}
export default observer(TechnicianRateCreateForm);