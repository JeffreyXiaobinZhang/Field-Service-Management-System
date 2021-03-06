import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search, Button } from 'semantic-ui-react';
import Invoice from './Invoice'
import { observer } from 'mobx-react-lite';
import InvoiceStore from '../../../app/stores/invoiceStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../../../frontpages/dailymanagement/NavBarDaily';
import { Link } from 'react-router-dom';

const InvoiceDashboard: React.FC = () => {
    const invoiceStore = useContext(InvoiceStore);

    useEffect(() => {
        invoiceStore.loadInvoices();
    }, [invoiceStore]);

    if(invoiceStore.loadingInitial)
        return <LoadingComponent content='Loading Invoice' />;
    
    return (
    <Segment>
      <Grid>
      <Grid.Column textAlign="center" width={4}> 
    <Dropdown
     placeholder='Select Invoice Type'
     selection
      />
      </Grid.Column>
      <Grid.Column textAlign="center" width={4}> 
      <Search
        />
        </Grid.Column>
        <Grid.Column width={5}></Grid.Column>
      <Grid.Column textAlign="center" width={3}>
        <Button
          as={Link}
          to={`/dailymanagement/invoice-create`}
          color="linkedin"
          icon="add"
          content="Create New"
        />
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column>
        <Invoice />
      </Grid.Column>
    </Grid>
    </Segment>
    );
};
export default observer(InvoiceDashboard);