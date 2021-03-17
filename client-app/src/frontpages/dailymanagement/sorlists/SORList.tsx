import React, { useContext, useState } from 'react';
import { Item, Button, Label, Segment, Table, Menu, Icon, Confirm, Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import SORListStore from '../../../app/stores/sorlistStore';
import { Link } from 'react-router-dom';

const SORList: React.FC = () => {
  const sorlistStore = useContext(SORListStore);
  const [open, setOpen] = useState(false);
  const {sorlistsByName: sorlistsByName,  deleteSORList: deleteSORList, submitting, target} = sorlistStore;
  return (
    <Container>
      <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Item Id</Table.HeaderCell>
        <Table.HeaderCell>Job Type</Table.HeaderCell>
        <Table.HeaderCell>Category</Table.HeaderCell>
        <Table.HeaderCell>Unit Rate</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>UOM</Table.HeaderCell>
        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {sorlistsByName.map(sorlist => (
      
      <Table.Row key={sorlist.name}>
        <Table.Cell>
          <Label>{sorlist.name}</Label>
        </Table.Cell>
        <Table.Cell>{sorlist.jobType}</Table.Cell>
        <Table.Cell>{sorlist.category}</Table.Cell>
        <Table.Cell> {sorlist.unitRate}</Table.Cell>
        <Table.Cell>{sorlist.type}</Table.Cell>
        <Table.Cell>{sorlist.uom}</Table.Cell>
        <Table.Cell>
        <Button.Group size='mini'>
                <Button
                  as={Link}
                  to={`/dailymanagement/sorlist/${sorlist.name}`}
                  size='mini'
                  icon="zoom in"
                  color='blue'
                  title="View"
                />
                <Button
                  name={sorlist.name}
                  size='mini'
                  loading={target === sorlist.id && submitting}
                  onClick={() => {setOpen(true)}}
                  title='Delete'
                  color='red'
                  icon="delete"
                />
                <Confirm
                    open={open}
                    onCancel={() => setOpen(false)}
                    onConfirm={(e) => {
                        deleteSORList(e, sorlist.name);
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

export default observer(SORList);
