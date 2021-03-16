import React, { useContext, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import SORTab from './SORTab';
import AssignmentTab from './AssignmentTab';
import ProjectLogTab from './ProjectLogTab';
<<<<<<< HEAD
import ProjectStore from '../../../app/stores/projectStore';
=======
import WarehouseTab from './WarehouseTab';
import ProjectStore from '../../../app/stores/projectStore';
import VendorTab from './VendorTab';
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6




const ProjectTab = () => {
  const projectstore = useContext(ProjectStore);
const { project } = projectstore;

const panes = [
   { menuItem: 'SOR', render: () => <SORTab /> },
   { menuItem: 'Assignment', render: () => <AssignmentTab/> },
<<<<<<< HEAD
   { menuItem: 'Material-In', render: () => <Tab.Pane>Material Content</Tab.Pane> },
   { menuItem: 'Material-Out', render: () => <Tab.Pane>Material Content</Tab.Pane> },
=======
   { menuItem: 'Material', render: () => <WarehouseTab/> },
   { menuItem: 'Third Party', render: () => <VendorTab /> },
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
   { menuItem: 'Log', render: () => <ProjectLogTab/> }
];

  return (
    <Tab
      panes={panes}
      
    />
  );
};

export default ProjectTab;
