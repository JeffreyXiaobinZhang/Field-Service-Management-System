import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import ProjectStore from '../../app/stores/projectStore';
import SORStore from '../../app/stores/sorlistStore';
import { observer } from 'mobx-react-lite';
import SORListDashboard from '../../frontpages/dailymanagement/sorlists/SORListDashboard';
import { Link, NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBarDaily: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/home'>
            <img src="/assets/brighten.jpg" alt="logo" style={{marginRight: 10}}/>
            FSMS
         </Menu.Item>
         <Menu.Item as={NavLink} to='/dailymanagement/warehouse'>Warehouse</Menu.Item>
        {/* <Dropdown item text='Warehouse'>
        <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to='/dailymanagement/warehouse' text='Check Warehouse' icon='edit'/>
         <Dropdown.Item as={NavLink} to='/dailymanagement/warehouse-create' text='Add Warehouse Item' icon='write'/>
        </Dropdown.Menu>
        </Dropdown> */}
        <Dropdown simple item text='Tools'>
        <Dropdown.Menu>
         <Dropdown.Item  text='Check Warehouse Items' icon='write'/>
        </Dropdown.Menu>
        </Dropdown>
        <Menu.Item as={NavLink} to='/dailymanagement/third'>Third Party</Menu.Item>
        <Menu.Item as={NavLink} to='/dailymanagement/sorlist'>SOR</Menu.Item>
        <Menu.Item as={NavLink} to='/dailymanagement/photorequest'>Photo Request</Menu.Item>
        {/* <Dropdown item text='SOR'>
        <Dropdown.Menu>
         <Dropdown.Item as={NavLink} to='/dailymanagement/sorlist' text='Query SOR' icon='edit'/>
         <Dropdown.Item as={NavLink} to='/dailymanagement/sorlist-create' text='Add SOR' icon='write'/>
        </Dropdown.Menu>
        </Dropdown> */}
        {/* <Dropdown simple item text='Invoice'>
        <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to='/dailymanagement/invoice' text='Query Invoice' icon='edit'/>
         <Dropdown.Item as={NavLink} to='/dailymanagement/invoice-create' text='Add Invoice' icon='write'/>
        </Dropdown.Menu>
        </Dropdown> */}
        <Menu.Item as={NavLink} to='/dailymanagement/invoice'>Invoice</Menu.Item>
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

export default observer(NavBarDaily);
