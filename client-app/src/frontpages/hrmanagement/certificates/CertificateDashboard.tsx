import React, { Fragment, useContext, useEffect, useState } from "react";
import { Grid, Segment, Dropdown, Search, Button } from "semantic-ui-react";
import CertificateList from "./CertificateList";
import { observer } from "mobx-react-lite";
import CertificateStore from "../../../app/stores/certificateStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";

const CertificateDashboard: React.FC = () => {
  const certificateStore = useContext(CertificateStore);
  const [category, setCategory]: any = useState("all");
  const categoryOptions = [
    { key: "Induction", text: "Induction", value: "Induction" },
    { key: "License", text: "License", value: "License" },
    { key: "Certificate", text: "Certificate", value: "Certificate" },
    { key: "Police Check", text: "Police Check", value: "Police Check" },
    { key: "Enable Skill", text: "Enable Skill", value: "Enable Skill" },
    { key: "Soft Skill", text: "Soft Skill", value: "Soft Skill" },
  ];
  const { loadCertificateCategory: loadCertificateCategory } = certificateStore;

  useEffect(() => {
    certificateStore.loadCertificates();
  }, [certificateStore]);

  if (certificateStore.loadingInitial)
    return <LoadingComponent content="Loading Certificates" />;

  return (
    <Segment>
      <Grid>
        <Grid.Column textAlign="center" width={4}>
          <Dropdown
            // width={5}
            placeholder="Select Certificate Type"
            selection
            onChange={(e, { value }) => setCategory(value)}
            options={categoryOptions}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <Button
            onClick={() => {
              loadCertificateCategory(category);
            }}
            content="Submit"
            color="green"
          />
        </Grid.Column>
        <Grid.Column textAlign="center" width={4}>
          <Search />
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column textAlign="center" width={3}>
          <Button
            as={Link}
            to={`/hrmanagement/certificate-create`}
            color="linkedin"
            icon="add"
            content="Create New"
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <CertificateList />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(CertificateDashboard);
