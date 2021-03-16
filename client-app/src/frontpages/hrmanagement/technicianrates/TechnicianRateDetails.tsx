import React, { useContext, useEffect } from 'react';
import { Card, Image, Button, Table } from 'semantic-ui-react';
import TechnicianRateStore from '../../../app/stores/technicianRateStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';

interface DetailParams {
    id: string;
}

const TechnicianRateDetails: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history
}) => {
    const technicianRateStore = useContext(TechnicianRateStore);
    const {
        technicianRate,
        loadTechnicianRate,
        loadingInitial
    } = technicianRateStore;

    useEffect(() => {
        loadTechnicianRate(match.params.id);
    }, [loadTechnicianRate, match.params.id]);

    if(loadingInitial || !technicianRate) 
        return <LoadingComponent content="Loading invoice ..." />
    
    return (
    <Card fluid>
      {/* <Image
        src={`/assets/categoryImages/${sorlist!.name}.jpg`}
        wrapped
        ui={false}
      /> */}
      <Card.Content>
        <Table definition>
    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>Email</Table.Cell>
        <Table.Cell> {technicianRate!.email} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Job Type</Table.Cell>
        <Table.Cell> {technicianRate!.jobType} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Item Name</Table.Cell>
        <Table.Cell> {technicianRate!.itemName} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Description</Table.Cell>
        <Table.Cell> {technicianRate!.description} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Category</Table.Cell>
        <Table.Cell> {technicianRate!.category} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Unit Rate</Table.Cell>
        <Table.Cell> {technicianRate!.unitRate} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>UOM</Table.Cell>
        <Table.Cell> {technicianRate!.uom} </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell collapsing>Remark</Table.Cell>
        <Table.Cell> {technicianRate!.remark} </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/hrmanagement/technicianrate-edit/${technicianRate.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            onClick={() => history.push('/hrmanagement/technicianrate')}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
    );
};

export default observer(TechnicianRateDetails);
