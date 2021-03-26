import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavHRmanagement: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/home'>
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
        <Dropdown.Item as={NavLink} to='/hrmanagement/technician' text='Technician'/>
         {/* <Dropdown.Item as={NavLink} to='/hrmanagement/technician-create' text='Add Technician' icon='write'/> */}
         <Dropdown.Item as={NavLink} to='/hrmanagement/technicianrate' text='Technician Rate'/>
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text='Certificate'>
        <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to='/hrmanagement/certificate' text='Certificate'/>
         {/* <Dropdown.Item as={NavLink} to='/hrmanagement/certificate-create' text='Add Certificate' icon='write'/> */}
         <Dropdown.Item as={NavLink} to='/hrmanagement/techniciancertificate' text='Technician Certificate'/>
         {/* <Dropdown.Item as={NavLink} to='/hrmanagement/techniciancertificate-create' text='Add Technician Certificate' icon='write'/> */}
        </Dropdown.Menu>
        </Dropdown>
        {user && (
          <Menu.Item position='right'>
            <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavHRmanagement);
