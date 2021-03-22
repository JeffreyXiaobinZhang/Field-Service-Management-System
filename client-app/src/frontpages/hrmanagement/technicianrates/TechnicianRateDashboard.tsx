import React, { Fragment, useContext, useEffect, useState } from "react";
import { Grid, Segment, Dropdown, Search, Button } from "semantic-ui-react";
import TechnicianRate from "./TechnicianRate";
import { observer } from "mobx-react-lite";
import TechnicianRateStore from "../../../app/stores/technicianRateStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";

const TechnicianRateDashboard: React.FC = () => {
  const technicianRateStore = useContext(TechnicianRateStore);
  const {
    submitting,
    techniciansByName,
    loadTechnicians,
    loadTechnicianRatesByEmail,
  } = technicianRateStore;

  const technicianOptions = techniciansByName.map(function (tech) {
    var option = { key: tech.id, text: tech.name, value: tech.email };
    return option;
  });

  const [techEmail, setEmail]: any = useState("@");

  useEffect(() => {
      technicianRateStore.loadTechnicianRates();
  }, [technicianRateStore]);
  useEffect(() => {loadTechnicians();}, []);


  if (technicianRateStore.loadingInitial)
    return <LoadingComponent content="Loading Technicians" />;

  return (
    <Segment>
      <Grid>
        <Grid.Column width={4} >
          <Dropdown
            onChange = {(event,{value}) => {loadTechnicianRatesByEmail(String(value));}}
            options={technicianOptions}
            selection
            placeholder="Select Technicians"
          />
        </Grid.Column>
        
        <Grid.Column width={4}>
          <Search />
        </Grid.Column>
        <Grid.Column width={5}>
          <h2></h2>
        </Grid.Column>
        <Grid.Column textAlign="center" width={3}>
          <Button
            color="green"
            as={Link}
            to={`/hrmanagement/technicianrate-create`}
            content="Add"
            icon='edit'
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <TechnicianRate />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(TechnicianRateDashboard);
