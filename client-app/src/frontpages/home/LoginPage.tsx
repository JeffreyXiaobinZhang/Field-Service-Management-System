import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/LoginForm';
import RegisterForm from '../user/RegisterForm';

const LoginPage = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, isLoggedIn } = rootStore.userStore;
  const {openModal} = rootStore.modalStore;

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
          // size='huge'
            src='/assets/brighten.jpg'
            // alt='logo'
            style={{ marginBottom: 50 }}
          />
          </Header>
         {/* <h1> Brighten Technologies </h1>  */}
        
        {isLoggedIn && user ? (
          <Fragment>
            <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
            <Button as={Link} to='/home' size='huge' inverted>
              Go to Field Management System!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
          <Header as='h2' inverted content={`Welcome to Field Management System`} />
          <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
            Login
          </Button>
          <Button onClick={() => openModal(<RegisterForm />)} size='huge' inverted>
            Register
          </Button>
        </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default LoginPage;
