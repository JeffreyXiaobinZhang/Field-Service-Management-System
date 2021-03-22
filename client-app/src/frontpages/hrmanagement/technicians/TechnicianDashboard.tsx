import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search, Button, Popup } from 'semantic-ui-react';
import TechnicianList from './TechnicianList';
import { observer } from 'mobx-react-lite';
import TechnicianStore from '../../../app/stores/technicianStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../../dailymanagement/NavBarDaily';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

const TechnicianDashboard: React.FC = () => {

  const technicianStore = useContext(TechnicianStore);
  const {techniciansByName: techniciansByName} = technicianStore;

  useEffect(() => {
    technicianStore.loadTechnicians();
  }, [technicianStore]);

  if (technicianStore.loadingInitial)
    return <LoadingComponent content='Loading Technicians' />;

  return (
    <Segment>
      <Grid>
      <Grid.Column textAlign="center" width={4}> 
    <Dropdown
     placeholder='Select Technician Type'
     selection
      />
      </Grid.Column>
      <Grid.Column textAlign="center" width={4}> 
      <Search
        />
        </Grid.Column>
        <Grid.Column width={5}>
        <CSVLink data={techniciansByName}  filename={"technician.csv"}>
      <Popup content='Download as CSV' trigger={<Button icon='download' floated='right' />} />
      </CSVLink>
        </Grid.Column>
      <Grid.Column textAlign="center" width={3}>
        <Button
          as={Link}
          to={'/hrmanagement/technician-create'}
          color="linkedin"
          icon="add"
          content="Create New"
        />
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column>
      <TechnicianList />
    </Grid.Column>
    </Grid>
        
    </Segment>
  );
};

export default observer(TechnicianDashboard);
