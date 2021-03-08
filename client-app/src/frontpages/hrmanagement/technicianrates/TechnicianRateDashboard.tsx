import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search, Button } from 'semantic-ui-react';
import TechnicianRate from './TechnicianRate';
import { observer } from 'mobx-react-lite';
import TechnicianRateStore from '../../../app/stores/technicianRateStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';
import NavBarDaily from '../../dailymanagement/NavBarDaily';


const TechnicianRateDashboard: React.FC = () => {
    const technicianRateStore = useContext(TechnicianRateStore);

    useEffect(() => {
        technicianRateStore.loadTechnicianRates();
    }, [technicianRateStore]);

    if(technicianRateStore.loadingInitial)
        return <LoadingComponent content = "Loading Technicians" />;
    
    return (
        <Segment>
      <Grid>
      <Grid.Column width={4}> 
    <Dropdown
    // width={5}
     placeholder='Select Technician'
     selection
      />
      </Grid.Column>
      <Grid.Column width={4}> 
      <Search/>
        </Grid.Column>
        <Grid.Column><Button 
        color = "green"
        as={Link}
        to={`/hrmanagement/technicianrate-create`}
        content="Add"
        /></Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column width={14}>
        <TechnicianRate />
      </Grid.Column>
      <Grid.Column width={2}>
        <h2></h2>
      </Grid.Column>
    </Grid>
    </Segment>
    );
};

export default observer(TechnicianRateDashboard);