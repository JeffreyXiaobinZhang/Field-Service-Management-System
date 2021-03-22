import React, { useState, useContext, useEffect } from "react";
import { Grid, Segment, Dropdown, Button } from "semantic-ui-react";
import ProjectList from "./ProjectList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ProjectStore from "../../../app/stores/projectStore";
import { Link } from "react-router-dom";

const ProjectDashboard: React.FC = () => {
  const projectStore = useContext(ProjectStore);
  const { loadProjectsStatus: loadProjectStatus } = projectStore;
  const status = [
    { key: "started", text: "Started", value: "started" },
    { key: "on-going", text: "On-going", value: "on-going" },
    { key: "completed", text: "Completed", value: "completed" },
  ];

  const [currentStatus, setStatus]: any = useState("all");

  useEffect(() => {
    projectStore.loadProjects();
  }, [projectStore]);

  // function handleSubmit(){
  //   loadProjectStatus(currentStatus);
  // }

  if (projectStore.loadingInitial)
    return <LoadingComponent content="Loading Projects" />;

  return (
    <Segment>
      <Grid>
        <Grid.Column textAlign="center" width={4}>
          <Dropdown
            placeholder="Select Project Status"
            onChange={(e, { value }) => setStatus(value)}
            selection
            options={status}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Button
            onClick={() => {
              loadProjectStatus(currentStatus);
            }}
            //onClick={(e) => loadProjectStatus(e, currentStatus)}
            content="Submit"
            color="green"
          />
        </Grid.Column>
        <Grid.Column width={5}></Grid.Column>
      <Grid.Column textAlign="center" width={3}>
        <Button
          as={Link}
          to={`/projectmanagement/project-create`}
          color="linkedin"
          icon="add"
          content="Create New"
        />
      </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <ProjectList />
        </Grid.Column>
        
      </Grid>
    </Segment>
  );
};

export default observer(ProjectDashboard);
