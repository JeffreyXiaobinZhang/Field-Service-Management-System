import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IInvoice } from '../../../app/models/invoice';
import { v4 as uuid } from 'uuid';
import InvoiceStore from '../../../app/stores/invoiceStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';

const InvoiceCreateForm: React.FC<RouteComponentProps> = ({
    match,
    history
}) => {
    const invoiceStore = useContext(InvoiceStore);
    const {
        createInvoice,
        editInvoice,
        submitting,
        invoice : initialFormState,
        loadInvoice,
        clearInvoice
    } = invoiceStore;

    const [invoice, setInvoice] = useState<IInvoice>({
        id: '',
        createdAt: '',
        updatedAt: '',
        invoiceType: '',
        invoiceNo: '',
        orderNo: '',
        issueDate: '',
        subtotal: '',
        location: '',
        contractNo: '',
        customer: '',
        paymentStatus: '',
        referenceNo: '',
        remark: ''
    });

    const statusOptions = [
      {key:'Sent', text:'Sent', value:'Sent'},
      {key:'Paid', text:'Paid', value:'Paid'}
    ]
    const customerOptions = [
      {key:'333 Industries Pty Ltd', text:'333 Industries Pty Ltd', value:'333 Industries Pty Ltd'},
      {key:'SERVICE STREAM COMMUNICATIONS', text:'SERVICE STREAM COMMUNICATIONS', value:'SERVICE STREAM COMMUNICATIONS'},
      {key:'Engytech Engineering Services', text:'Engytech Engineering Services', value:'Engytech Engineering Services'}
    ]



    const handleSubmit = () => {
        createInvoice(invoice).then(() => history.push(`/dailymanagement/invoice`));
    };

    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;
        setInvoice({ ...invoice, [name]: value});
    };
    return (
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label='Invoice Type'
              required
              onChange={handleInputChange}
              name='invoiceType'
              placeholder='Invoice Type'
              value={invoice.invoiceType}
            />
            <Form.Input
              label='Invoice No'
              required
              onChange={handleInputChange}
              name='invoiceNo'
              placeholder='Invoice No'
              value={invoice.invoiceNo}
            />
            <Form.Input
              label='Order No'
              required
              onChange={handleInputChange}
              name='orderNo'
              placeholder='Order No'
              value={invoice.orderNo}
            />
            <Form.Input
              label='Issue Date'
              required
              onChange={handleInputChange}
              name='issueDate'
              placeholder='Issue Date'
              value={invoice.issueDate}
              type="date"
            />
            <Form.Input
              label='Subtotal'
              onChange={handleInputChange}
              name='subtotal'
              placeholder='Subtotal'
              value={invoice.subtotal}
            />
            <Form.TextArea
            label='Location'
              onChange={handleInputChange}
              name='location'
              rows={2}
              placeholder='Location'
              value={invoice.location}
            />
            <Form.Input
            label='contract No'
            required
              onChange={handleInputChange}
              name='contractNo'
              placeholder='Contract No'
              value={invoice.contractNo}
            />
            <Form.Select
            label='customer'
              onChange={(e, {name, value}) => setInvoice({...invoice, [name]: value})}
              name='customer'
              placeholder='customer'
              value={invoice.customer}
              options={customerOptions}
            />
            <Form.Select
        label='Payment Status'
            onChange={(e, {name, value}) => setInvoice({...invoice, [name]: value})}
            name='paymentStatus'
            placeholder='Payment Status'
            value={invoice.paymentStatus}
            options={statusOptions}
        />
            <Form.Input
            label='Reference No'
              onChange={handleInputChange}
              name='referenceNo'
              placeholder='Rerfernce No'
              value={invoice.referenceNo}
            />
             <Form.TextArea
            label='Remark'
              onChange={handleInputChange}
              name='remark'
              rows={2}
              placeholder='Remark'
              value={invoice.remark}
            />
            <Button
              loading={submitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              onClick={() => history.push('/dailymanagement/invoice')}
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        </Segment>
      );
}

export default observer(InvoiceCreateForm);