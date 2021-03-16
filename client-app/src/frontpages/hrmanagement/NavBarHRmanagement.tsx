import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';

const NavHRmanagement: React.FC = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/'>
            <img src="/assets/brighten.jpg" alt="logo" style={{marginRight: 10}}/>
            FSMS
         </Menu.Item>
        <Dropdown item text='Employee'>
        <Dropdown.Menu>
         <Dropdown.Item  text='Query Employee' icon='write'/>
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text='Technician'>
        <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to='/hrmanagement/technician' text='Query Technician' icon='edit'/>
         <Dropdown.Item as={NavLink} to='/hrmanagement/technician-create' text='Add Technician' icon='write'/>
         <Dropdown.Item as={NavLink} to='/hrmanagement/technicianrate' text='Technician Rate' icon='edit'/>
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text='Certificate'>
        <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to='/hrmanagement/certificate' text='Query Certificate' icon='edit'/>
         <Dropdown.Item as={NavLink} to='/hrmanagement/certificate-create' text='Add Certificate' icon='write'/>
         <Dropdown.Item as={NavLink} to='/hrmanagement/techniciancertificate' text='Query Technician Certificate' icon='edit'/>
         <Dropdown.Item as={NavLink} to='/hrmanagement/techniciancertificate-create' text='Add Technician Certificate' icon='write'/>
        </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>
  );
};

export default observer(NavHRmanagement);
