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
  Container
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import InvoiceStroe from "../../../app/stores/invoiceStore";
import { Link } from "react-router-dom";

const Invoice: React.FC = () => {
  const [open, setOpen] = useState(false);
  const invoiceStroe = useContext(InvoiceStroe);
  const {
    invoiceByDate: invoiceByDate,
    deleteInvoice: deleteInvoice,
    submitting,
    target,
  } = invoiceStroe;
  return (
    <Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Invoice Type</Table.HeaderCell>
            <Table.HeaderCell>Invoice No</Table.HeaderCell>
            <Table.HeaderCell>Issue Date</Table.HeaderCell>
            <Table.HeaderCell>Subtotal</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Payment Staus</Table.HeaderCell>
            <Table.HeaderCell width={1}>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {invoiceByDate.map((invoice) => (
            <Table.Row key={invoice.id}>
              <Table.Cell>{invoice.invoiceType}</Table.Cell>
              <Table.Cell>{invoice.invoiceNo}</Table.Cell>
              <Table.Cell>{invoice.issueDate.substring(0,10)}</Table.Cell>
              <Table.Cell>{invoice.subtotal}</Table.Cell>
              <Table.Cell>{invoice.location}</Table.Cell>
              <Table.Cell>{invoice.customer}</Table.Cell>
              <Table.Cell>{invoice.paymentStatus}</Table.Cell>
              <Table.Cell>
                <Button.Group size="mini">
                  <Button
                    as={Link}
                    to={`/dailymanagement/invoice/${invoice.id}`}
                    size="mini"
                    icon="zoom in"
                    color="blue"
                    title="View"
                  />
                  <Button
                    name={invoice.id}
                    size="mini"
                    loading={target === invoice.id && submitting}
                    onClick={() => {
                      setOpen(true);
                    }}
                    icon="delete"
                    color="red"
                    title="Delete"
                  />
                  <Confirm
                    open={open}
                    onCancel={() => setOpen(false)}
                    onConfirm={(e) => {
                        deleteInvoice(e, invoice.id);
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
export default observer(Invoice);
