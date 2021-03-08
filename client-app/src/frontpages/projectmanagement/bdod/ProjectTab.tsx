import React, { useContext, useState } from 'react';
import { Tab } from 'semantic-ui-react';
import SORTab from './SORTab';
import AssignmentTab from './AssignmentTab';
import ProjectLogTab from './ProjectLogTab';
import WarehouseTab from './WarehouseTab';
import ProjectStore from '../../../app/stores/projectStore';
import VendorTab from './VendorTab';




const ProjectTab = () => {
  const projectstore = useContext(ProjectStore);
const { project } = projectstore;

const panes = [
   { menuItem: 'SOR', render: () => <SORTab /> },
   { menuItem: 'Assignment', render: () => <AssignmentTab/> },
   { menuItem: 'Material', render: () => <WarehouseTab/> },
   { menuItem: 'Third Party', render: () => <VendorTab /> },
   { menuItem: 'Log', render: () => <ProjectLogTab/> }
];

  return (
    <Tab
      panes={panes}
      
    />
  );
};

export default ProjectTab;
