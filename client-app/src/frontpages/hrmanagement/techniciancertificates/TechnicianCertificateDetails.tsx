import React, { useContext, useEffect } from 'react';
import { Card, Image, Button, Table } from 'semantic-ui-react';
import CertificateStore from '../../../app/stores/certificateStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
  id: string;
}

const CertificateDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const certificateStore = useContext(CertificateStore);
  const {
    certificate,
    loadCertificate,
    loadingInitial
  } = certificateStore;

  useEffect(() => {
    loadCertificate(match.params.id);
  }, [loadCertificate, match.params.id]);

   if (loadingInitial || !certificate) return <LoadingComponent content='Loading Certificate ...' /> 

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${certificate!.name}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {certificate!.name}</Card.Header>
        <Table definition>
    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>Category</Table.Cell>
        <Table.Cell> {certificate!.category} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Level</Table.Cell>
        <Table.Cell> {certificate!.level} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Description</Table.Cell>
        <Table.Cell> {certificate!.description} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Remark</Table.Cell>
        <Table.Cell> {certificate!.remark} </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/hrmanagement/certificate-edit/${certificate.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/hrmanagement/certificate')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(CertificateDetails);
