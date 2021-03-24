import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Grid, Segment, Dropdown, Search, Button } from 'semantic-ui-react';
import SORList from './SORList';
import { observer } from 'mobx-react-lite';
import SORListStore from '../../../app/stores/sorlistStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import NavBarDaily from '../../../frontpages/dailymanagement/NavBarDaily';
import { Link } from 'react-router-dom';

const SORListDashboard: React.FC = () => {

  const sorlistStore = useContext(SORListStore);
  const [category, setCategory]: any = useState("all");
  const categoryOptions = [
    {key:'Civils', text:'Civils', value:'Civils'},
    {key:'Splicing', text:'Splicing', value:'Splicing'},
    {key:'Other', text:'Other', value:'Other'},
    {key:'External Hauling', text:'External Hauling', value:'External Hauling'},
    {key:'Internal cabling', text:'Internal cabling', value:'Internal cabling'},
  ]
  const{loadSORListCategory: loadSORListCategory} = sorlistStore;

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
     onChange = {(e, {value}) => setCategory(value)}
     options={categoryOptions}
      />
      </Grid.Column>
      <Grid.Column width={3}>
          <Button
            onClick={() => {
              loadSORListCategory(category);
            }}
            content="Submit"
            color="green"
          />
        </Grid.Column>
      <Grid.Column textAlign="center" width={4}> 
      <Search
        />
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
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
