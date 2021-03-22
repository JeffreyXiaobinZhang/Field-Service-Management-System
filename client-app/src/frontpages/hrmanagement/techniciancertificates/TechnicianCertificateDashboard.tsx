import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Grid,
  Segment,
  Dropdown,
  Search,
  Select,
  Form,
  Button,
  Container,
} from "semantic-ui-react";
import TechnicianCertificateList from "./TechnicianCertificateList";
import { observer } from "mobx-react-lite";
import TechnicianCertificateStore from "../../../app/stores/techniciancertificateStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";

const TechnicianCertificateDashboard: React.FC = () => {
  const techniciancertificateStore = useContext(TechnicianCertificateStore);
  const {
    createTechnicianCertificate,
    editTechnicianCertificate,
    submitting,
    techniciancertificate: initialFormState,
    loadTechnicianCertificates,
    loadTechnicians,
    techniciansByName,
    loadCertificates,
    certificatesByName,
    searchTechnicianCertificates,
    clearTechnicianCertificate,
  } = techniciancertificateStore;

  useEffect(() => {
    // loadTechnicianCertificates();
    loadTechnicians();
    loadCertificates();
  }, []);

  const initializeForm = {
    technicianid: "",
    certone: "",
    certtwo: "",
    certthree: "",
    expiry: "",
  };

  const [search, setSearch] = useState({
    technicianid: "",
    certone: "",
    certtwo: "",
    certthree: "",
    expiry: "",
  });

  if (techniciancertificateStore.loadingInitial)
    return <LoadingComponent content="Loading TechnicianCertificates" />;

  const technicianOptions = techniciansByName.map(function (tech) {
    var option = { key: tech.id, text: tech.name, value: tech.id };
    return option;
  });

  const certificateOptions = certificatesByName.map(function (cert) {
    var option = { key: cert.id, text: cert.name, value: cert.id };
    return option;
  });

  const expiryOptions = [
    { key: "expired", text: "Expired", value: "expired" },
    { key: "onemonth", text: "Within One Month", value: "onemonth" },
    { key: "threemonth", text: "Within Three Month", value: "threemonth" },
  ];

  const handleSubmit = () => {
    searchTechnicianCertificates(search).then(() => setSearch(initializeForm));
  };

  return (
    <Segment>
      <Grid>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Form.Select
              label="Name"
              onChange={(e, { name, value }) =>
                setSearch({ ...search, [name]: value })
              }
              options={technicianOptions}
              search
              name="technicianid"
              placeholder="Name"
              value={search.technicianid}
              width={3}
            />
            <Form.Group widths="equal">
              {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
              <Form.Select
                label="Certificate"
                onChange={(e, { name, value }) =>
                  setSearch({ ...search, [name]: value })
                }
                options={certificateOptions}
                search
                name="certone"
                placeholder="Certificate"
                value={search.certone}
              />

              <p>
                <br />
                <br />
                <h5>&amp; </h5>
              </p>
              <Form.Select
                label="Certificate"
                onChange={(e, { name, value }) =>
                  setSearch({ ...search, [name]: value })
                }
                options={certificateOptions}
                search
                name="certtwo"
                placeholder="Certificate"
                value={search.certtwo}
              />

              <p>
                <br />
                <br />
                <h5>&amp; </h5>
              </p>
              <Form.Select
                label="Certificate"
                onChange={(e, { name, value }) =>
                  setSearch({ ...search, [name]: value })
                }
                options={certificateOptions}
                search
                name="certthree"
                placeholder="Certificate"
                value={search.certthree}
              />
            </Form.Group>
            <Form.Select
              label="Expiry Date"
              width={3}
              onChange={(e, { name, value }) =>
                setSearch({ ...search, [name]: value })
              }
              options={expiryOptions}
              search
              name="expiry"
              placeholder="Expiry Date"
              value={search.expiry}
            />
            <Button
              loading={submitting}
              floated="left"
              positive
              type="submit"
              content="Search"
            />
          </Form>
        </Grid.Column>
      </Grid>
      <Grid> 
      <Grid.Column width={13}></Grid.Column>
        <Grid.Column textAlign="center" width={3}>
          <Button
            as={Link}
            to={`/hrmanagement/techniciancertificate-create`}
            color="linkedin"
            icon="add"
            content="Create New"
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <TechnicianCertificateList />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(TechnicianCertificateDashboard);
