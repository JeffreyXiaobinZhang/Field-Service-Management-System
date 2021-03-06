import React, { useContext, useState } from "react";
import {
  Item,
  Button,
  Label,
  Segment,
  Table,
  Menu,
  Icon,
  Tab,
  Confirm,
  Modal,
  Container,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import TechnicianRateStore from "../../../app/stores/technicianRateStore";
import { Link } from "react-router-dom";

const TechnicianRate: React.FC = () => {
  const [open, setOpen] = useState(false);
  const[rateId, setRateId] = useState("");
  const technicianRateStore = useContext(TechnicianRateStore);
  const {
    technicianRatesByName: technicianRatesByName,
    deleteTechnicianRate: deleteTechnicianRate,
    submitting,
    target,
  } = technicianRateStore;
  return (
    <Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Job Type</Table.HeaderCell>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Unit Rate</Table.HeaderCell>
            <Table.HeaderCell>UOM</Table.HeaderCell>
            <Table.HeaderCell width={1}>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {technicianRatesByName.map((rate) => (
            <Table.Row key={rate.id}>
              <Table.Cell>{rate.jobType}</Table.Cell>
              <Table.Cell>{rate.itemName}</Table.Cell>
              <Table.Cell>{rate.category}</Table.Cell>
              <Table.Cell>{rate.unitRate}</Table.Cell>
              <Table.Cell>{rate.uom}</Table.Cell>
              <Table.Cell>
                <Button.Group size="mini">
                  <Button
                    as={Link}
                    to={`/hrmanagement/technicianrate/${rate.id}`}
                    size="mini"
                    icon="zoom in"
                    color="blue"
                    title="View"
                  />
                  <Button
                    name={rate.id}
                    size="mini"
                    loading={target === rate.id && submitting}
                    onClick={() => {
                      setOpen(true);
                      setRateId(rate.id);
                    }}
                    icon="delete"
                    color="red"
                    title="Delete"
                  />
                  <Confirm
                    open={open}
                    onCancel={() => setOpen(false)}
                    onConfirm={(e) => {
                      deleteTechnicianRate(rateId);
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
            <Table.HeaderCell colSpan="9">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  );
};
export default observer(TechnicianRate);
