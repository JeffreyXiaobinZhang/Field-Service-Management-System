import React, { useContext, useState } from 'react';
import { Item, Button, Label, Segment, Table, Menu, Icon, Confirm, Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoRequestStore from '../../../app/stores/photorequestStore';
import { Link } from 'react-router-dom';

const PhotoRequest: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [requestId, setRequestId] = useState("");
  const photorequestStore = useContext(PhotoRequestStore);
  const {photorequestsByItem: photorequestsByItem,  deletePhotoRequest: deletePhotoRequest, submitting, target} = photorequestStore;
  
  return (
    <Container>
      <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Item</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Activity</Table.HeaderCell>
        <Table.HeaderCell>Request</Table.HeaderCell>
        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {photorequestsByItem.map(photorequest => (
      
      <Table.Row key={photorequest.id}>
        <Table.Cell>
          <Label>{photorequest.item}</Label>
        </Table.Cell>
        <Table.Cell>{photorequest.type}</Table.Cell>
        <Table.Cell>{photorequest.activity}</Table.Cell>
        <Table.Cell>{photorequest.request}</Table.Cell>
        <Table.Cell>
        <Button.Group size='mini'>
                <Button
                  as={Link}
                  to={`/dailymanagement/photorequest/${photorequest.id}`}
                  size='mini'
                  title='View'
                  color='blue'
                  icon='zoom in'
                />
                <Button
                  name={photorequest.id}
                  size='mini'
                  loading={target === photorequest.id && submitting}
                  //onClick={(e) => deletePhotoRequest(e, photorequest.id)}
                  onClick={() => {
                    setOpen(true);
                    setRequestId(photorequest.id);
                  }}
                  icon="delete"
                  color="red"
                  title="Delete"
                />
                <Confirm
                    open={open}
                    onCancel={() => setOpen(false)}
                    onConfirm={(e) => {
                      deletePhotoRequest(requestId);
                        setOpen(false);
                    }}
                    content="Are you sure you want to delete ?"
                    confirmButton="Yes"
                    size="mini"
                    style={{
                      position: "relative",
                      maxHeight: "150px",
                      height: "auto",
                    }}
                  />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    ))}
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='6'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
    </Container>
  );
};

export default observer(PhotoRequest);
