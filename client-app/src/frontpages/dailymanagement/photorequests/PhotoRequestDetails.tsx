import React, { useContext, useEffect } from 'react';
import { Card, Image, Button, Table } from 'semantic-ui-react';
import PhotoRequestStore from '../../../app/stores/photorequestStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
  id: string;
}

const PhotoRequestDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const photorequestStore = useContext(PhotoRequestStore);
  const {
    photorequest,
    loadPhotoRequest,
    loadingInitial
  } = photorequestStore;

  useEffect(() => {
    loadPhotoRequest(match.params.id);
  }, [loadPhotoRequest, match.params.id]);

   if (loadingInitial || !photorequest) return <LoadingComponent content='Loading PhotoRequest ...' /> 

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Item:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {photorequest!.item}</Card.Header>
        <Table definition>
    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>Type</Table.Cell>
        <Table.Cell> {photorequest!.type} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Activity</Table.Cell>
        <Table.Cell> {photorequest!.activity} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Request</Table.Cell>
        <Table.Cell> {photorequest!.request} </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/dailymanagement/photorequest-edit/${photorequest.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/dailymanagement/photorequest')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(PhotoRequestDetails);
