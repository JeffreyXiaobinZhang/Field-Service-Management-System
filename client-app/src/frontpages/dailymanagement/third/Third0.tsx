import React, { useContext, useState } from "react";
import {
  Item,
  Button,
  Label,
  Segment,
  Table,
  Menu,
  Icon,
  Confirm,
  Container,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ThirdStore from "../../../app/stores/ThirdStore";
import { Link } from "react-router-dom";

const Third0: React.FC = () => {
  const thirdStore0 = useContext(ThirdStore);
  const {
    ThirdPartiesByName: ThirdPartiesByName,
    deleteThirdParty: deleteThirdParty,
    submitting,
    target,
  } = thirdStore0;
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");

  return (
    <Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>Item Id</Table.HeaderCell>
        <Table.HeaderCell>Created Time</Table.HeaderCell>
        <Table.HeaderCell>Updated Time</Table.HeaderCell> */}
            <Table.HeaderCell>CompanyName</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>ContactPerson</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            {/* <Table.HeaderCell>Remark</Table.HeaderCell> */}
            <Table.HeaderCell width={1}>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {ThirdPartiesByName.map((thirdlist) => (
            <Table.Row key={thirdlist.companyName}>
              <Table.Cell>{thirdlist.companyName}</Table.Cell>
              <Table.Cell>{thirdlist.type}</Table.Cell>
              <Table.Cell>{thirdlist.contactPerson}</Table.Cell>
              <Table.Cell>{thirdlist.phone}</Table.Cell>
              <Table.Cell>{thirdlist.email}</Table.Cell>
              <Table.Cell>{thirdlist.address}</Table.Cell>
              {/* <Table.Cell>{thirdlist.remark}</Table.Cell> */}
              <Table.Cell>
                <Button.Group size="mini">
                  {/* link to detail and edit */}
                  <Button
                    as={Link}
                    to={`/dailymanagement/third/${thirdlist.companyName}`}
                    size="mini"
                    color="blue"
                    icon="zoom in"
                    title="View"
                  />
                  {/* link to delete
                <Button
                name={thirdlist.name}
                size='mini'
                loading={target === thirdlist.id && submitting}
                onClick={(e) => deleteThirdParty(e, thirdlist.name)}
                // content='Delete'
                icon = 'add'
                color='green'
              /> */}
                  {/* link to delete */}
                  <Button
                    name={thirdlist.companyName}
                    size="mini"
                    loading={target === thirdlist.companyName && submitting}
                    onClick={() => {
                      setOpen(true);
                      setCompanyName(thirdlist.companyName);
                    }}
                    icon="delete"
                    color="red"
                    title="Delete"
                  />
                  <Confirm
                    open={open}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    onConfirm={() => {
                      deleteThirdParty(companyName);
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
            <Table.HeaderCell colSpan="6">
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

export default observer(Third0);
