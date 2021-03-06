import React, { Fragment, useContext, useEffect } from "react";
import { Grid, Segment, Dropdown, Search, Button } from "semantic-ui-react";
import WarehouseList from "./WarehouseList";
import { observer } from "mobx-react-lite";
import WarehouseStore from "../../../app/stores/warehouseStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import NavBarDaily from "../../dailymanagement/NavBarDaily";
import { Link } from "react-router-dom";

const WarehouseDashboard: React.FC = () => {
  const warehouseStore = useContext(WarehouseStore);

  useEffect(() => {
    warehouseStore.loadWarehouses();
  }, [warehouseStore]);

  if (warehouseStore.loadingInitial)
    return <LoadingComponent content="Loading Warehouses" />;

  return (
    <Segment>
      <Grid>
        <Grid.Column textAlign="center" width={4}>
          <Dropdown
            // width={5}
            placeholder="Select Warehouse Type"
            selection
          />
        </Grid.Column>
        <Grid.Column textAlign="center" width={4}>
          <Search />
        </Grid.Column>
      
      <Grid.Column width={5}></Grid.Column>
      <Grid.Column textAlign="center" width={3}>
        <Button
          as={Link}
          to={`/dailymanagement/warehouse-create`}
          color="linkedin"
          icon="add"
          content="Create New"
        />
      </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <WarehouseList />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(WarehouseDashboard);
