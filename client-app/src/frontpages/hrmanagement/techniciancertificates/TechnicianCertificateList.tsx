import React, { useContext } from 'react';
import { Item, Button, Label, Segment, Table, Menu, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import TechnicianCertificateStore from '../../../app/stores/techniciancertificateStore';
import { Link } from 'react-router-dom';

const TechnicianCertificate: React.FC = () => {
  const techniciancertificateStore = useContext(TechnicianCertificateStore);
  const {techniciancertificatenamesByEmail: techniciancertificatenamesByEmail,  deleteTechnicianCertificate: deleteTechnicianCertificate, submitting, target} = techniciancertificateStore;
  return (

      <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Certificate</Table.HeaderCell>
        <Table.HeaderCell>Expiry Date</Table.HeaderCell>
        <Table.HeaderCell>Remark</Table.HeaderCell>
        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {techniciancertificatenamesByEmail.map(techniciancertificate => (

    <Table.Row key={techniciancertificate.id}> 
        <Table.Cell>
          <Label>{techniciancertificate.name}</Label>
        </Table.Cell>
        <Table.Cell>{techniciancertificate.certificate}</Table.Cell> 
    { (techniciancertificate.expiryDate < new Date().toISOString()) ? 
    <Table.Cell error>{techniciancertificate.expiryDate}</Table.Cell>
     : (techniciancertificate.expiryDate < new Date(new Date().setMonth(new Date().getMonth()+3)).toISOString()) ? 
     <Table.Cell warning>{techniciancertificate.expiryDate}</Table.Cell> 
     : <Table.Cell>{techniciancertificate.expiryDate}</Table.Cell>} 
        {/* <Table.Cell>{<span style={{backgroundColor: 'red'}}>{techniciancertificate.expiryDate}</span>}</Table.Cell>  */}
     <Table.Cell>{techniciancertificate.remark}</Table.Cell> 
        <Table.Cell>
        <Button.Group size='mini'>
                <Button
                  as={Link}
                  to={`/hrmanagement/techniciancertificate-edit/${techniciancertificate.id}/${techniciancertificate.technicianId}/${techniciancertificate.certificateId}/${techniciancertificate.expiryDate}/${techniciancertificate.remark || ' '}/`}
                  size='mini'
                  content='Edit'
                  color='blue'
                />
                <Button
                  name={techniciancertificate.id}
                  size='mini'
                  loading={target === techniciancertificate.id && submitting}
                  onClick={(e) => deleteTechnicianCertificate(e, techniciancertificate.id)}
                  content='Delete'
                  color='red'
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

  );
};

export default observer(TechnicianCertificate);
