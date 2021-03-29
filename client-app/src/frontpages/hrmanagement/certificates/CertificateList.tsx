import React, { useContext, useState } from 'react';
import { Item, Button, Label, Segment, Table, Menu, Icon, Confirm, Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import CertificateStore from '../../../app/stores/certificateStore';
import { Link } from 'react-router-dom';

const Certificate: React.FC = () => {
  const certificateStore = useContext(CertificateStore);
  const {certificatesByName: certificatesByName,  deleteCertificate: deleteCertificate, submitting, target} = certificateStore;
  const [open, setOpen] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  return (
    <Container>
      <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Category</Table.HeaderCell>
        <Table.HeaderCell>Level</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {certificatesByName.map(certificate => (
      
      <Table.Row key={certificate.id}>
        <Table.Cell>
          <Label>{certificate.name}</Label>
        </Table.Cell>
        <Table.Cell>{certificate.category}</Table.Cell>
        <Table.Cell>{certificate.level}</Table.Cell>
        <Table.Cell>{certificate.description}</Table.Cell>
        <Table.Cell>
        <Button.Group size='mini'>
                <Button
                  as={Link}
                  to={`/hrmanagement/certificate/${certificate.id}`}
                  size='mini'
                  icon="zoom in"
                    color="blue"
                    title="View"
                />
                <Button
                  name={certificate.id}
                  size='mini'
                  loading={target === certificate.id && submitting}
                  onClick={() => {
                    setOpen(true);
                    setCertificateId(certificate.id);
                  }}
                  icon="delete"
                  color="red"
                  title="Delete"
                />
                <Confirm
                    open={open}
                    onCancel={() => setOpen(false)}
                    onConfirm={(e) => {
                      deleteCertificate(certificateId);
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

export default observer(Certificate);
