import React, { Fragment, useContext, useEffect } from 'react';
import { Grid, Segment, Dropdown, Search, Button } from 'semantic-ui-react';
import SORList from './SORList';
import { observer } from 'mobx-react-lite';
import SORListStore from '../../../app/stores/sorlistStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../../../frontpages/dailymanagement/NavBarDaily';
import { Link } from 'react-router-dom';

const SORListDashboard: React.FC = () => {

  const sorlistStore = useContext(SORListStore);

  useEffect(() => {
    sorlistStore.loadSORLists();
  }, [sorlistStore]);

  if (sorlistStore.loadingInitial)
    return <LoadingComponent content='Loading SORs' />;

  return (
    <Segment>
      <Grid>
      <Grid.Column textAlign="center" width={4}> 
    <Dropdown
    // width={5}
     placeholder='Select SOR Type'
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
          to={`/dailymanagement/sorlist-create`}
          color="linkedin"
          icon="add"
          content="Create New"
        />
      </Grid.Column>
    </Grid>
    <Grid>
      <Grid.Column>
        <SORList />
      </Grid.Column>
    </Grid>
    </Segment>
  );
};

export default observer(SORListDashboard);
