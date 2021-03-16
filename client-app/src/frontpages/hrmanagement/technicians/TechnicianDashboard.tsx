import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search } from 'semantic-ui-react';
import TechnicianList from './TechnicianList';
import { observer } from 'mobx-react-lite';
import TechnicianStore from '../../../app/stores/technicianStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../../dailymanagement/NavBarDaily';

const TechnicianDashboard: React.FC = () => {

  const technicianStore = useContext(TechnicianStore);

  useEffect(() => {
    technicianStore.loadTechnicians();
  }, [technicianStore]);

  if (technicianStore.loadingInitial)
    return <LoadingComponent content='Loading Technicians' />;

  return (
    <Segment>
      <Grid>
      <Grid.Column width={4}> 
    <Dropdown
<<<<<<< HEAD
    // width={5}
=======
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
     placeholder='Select Technician Type'
     selection
      />
      </Grid.Column>
      <Grid.Column width={4}> 
      <Search
        />
        </Grid.Column>
    </Grid>
<<<<<<< HEAD
    <Grid>
      <Grid.Column width={14}>
        <TechnicianList />
      </Grid.Column>
      <Grid.Column width={2}>
        <h2></h2>
      </Grid.Column>
    </Grid>
=======
        <TechnicianList />
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
    </Segment>
  );
};

export default observer(TechnicianDashboard);
