import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBarProject: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to='/home'>
            <img src="/assets/brighten.jpg" alt="logo" style={{marginRight: 10}}/>
            FSMS
         </Menu.Item>
         <Menu.Item as={NavLink} to='/projectmanagement/project'>BDOD</Menu.Item>
         {/* <Dropdown item text='BDOD'>
         <Dropdown.Menu> 
          <Dropdown.Item as={NavLink} to='/projectmanagement/project' text='Query Project' icon='edit'/> 
          <Dropdown.Item as={NavLink} to='/projectmanagement/project-create' text='Create Project' icon='write'/> 
         </Dropdown.Menu> 
         </Dropdown>  */}
         <Menu.Item as={NavLink} to='/projectmanagement/project'>FTTB</Menu.Item>
         {/* <Dropdown item text='FTTB'>
         <Dropdown.Menu> 
          <Dropdown.Item as={NavLink} to='/projectmanagement/project' text='Query Project' icon='edit'/> 
          <Dropdown.Item as={NavLink} to='/projectmanagement/project-create' text='Create Project' icon='write'/> 
         </Dropdown.Menu> 
         </Dropdown>  */}
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

export default observer(NavBarProject);
