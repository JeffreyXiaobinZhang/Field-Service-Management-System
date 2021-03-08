import React, { useContext, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import SORTab from './SORTab';
import AssignmentTab from './AssignmentTab';
import ProjectLogTab from './ProjectLogTab';
import ProjectStore from '../../../app/stores/projectStore';




const ProjectTab = () => {
  const projectstore = useContext(ProjectStore);
const { project } = projectstore;

const panes = [
   { menuItem: 'SOR', render: () => <SORTab /> },
   { menuItem: 'Assignment', render: () => <AssignmentTab/> },
   { menuItem: 'Material-In', render: () => <Tab.Pane>Material Content</Tab.Pane> },
   { menuItem: 'Material-Out', render: () => <Tab.Pane>Material Content</Tab.Pane> },
   { menuItem: 'Log', render: () => <ProjectLogTab/> }
];

  return (
    <Tab
      panes={panes}
      
    />
  );
};

export default ProjectTab;
