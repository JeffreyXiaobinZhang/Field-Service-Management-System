import React, { Fragment, useContext, useEffect } from "react";
import { Grid, Segment, Dropdown, Search, Button } from "semantic-ui-react";
import PhotoRequestList from "./PhotoRequestList";
import { observer } from "mobx-react-lite";
import PhotoRequestStore from "../../../app/stores/photorequestStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import NavBarDaily from "../../dailymanagement/NavBarDaily";
import { Link } from "react-router-dom";

const PhotoRequestDashboard: React.FC = () => {
  const photorequestStore = useContext(PhotoRequestStore);

  useEffect(() => {
    photorequestStore.loadPhotoRequests();
  }, [photorequestStore]);

  if (photorequestStore.loadingInitial)
    return <LoadingComponent content="Loading PhotoRequests" />;

  return (
    <Segment>
      <Grid>
        <Grid.Column textAlign="center" width={4}>
          <Dropdown
            // width={5}
            placeholder="Select PhotoRequest Type"
            selection
          />
        </Grid.Column>
        <Grid.Column textAlign="center" width={4}>
          <Search />
        </Grid.Column>
      
      <Grid.Column width={5}></Grid.Column>
      <Grid.Column textAlign="center" width={3}>
        <Button
          as={Link}
          to={`/dailymanagement/photorequest-create`}
          color="linkedin"
          icon="add"
          content="Create New"
        />
      </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <PhotoRequestList />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(PhotoRequestDashboard);
