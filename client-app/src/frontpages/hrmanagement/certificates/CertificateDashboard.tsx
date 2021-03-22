import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search } from 'semantic-ui-react';
import CertificateList from './CertificateList';
import { observer } from 'mobx-react-lite';
import CertificateStore from '../../../app/stores/certificateStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const CertificateDashboard: React.FC = () => {

  const certificateStore = useContext(CertificateStore);

  useEffect(() => {
    certificateStore.loadCertificates();
  }, [certificateStore]);

  if (certificateStore.loadingInitial)
    return <LoadingComponent content='Loading Certificates' />;

  return (
    <Segment>
      <Grid>
      <Grid.Column width={4}> 
    <Dropdown
    // width={5}
     placeholder='Select Certificate Type'
     selection
      />
      </Grid.Column>
      <Grid.Column width={4}> 
      <Search
        />
        </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column>
        <CertificateList />
      </Grid.Column>
    </Grid>
    </Segment>
  );
};

export default observer(CertificateDashboard);
