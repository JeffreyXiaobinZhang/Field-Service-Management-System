import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
<<<<<<< HEAD
=======
import { toast } from 'react-toastify';
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
import { IWarehouse } from '../models/warehouse';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class WarehouseStore {
  @observable warehouseRegistry = new Map();
  @observable warehouse: IWarehouse | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get warehousesByPartNo() {
    return Array.from(this.warehouseRegistry.values()).sort(
<<<<<<< HEAD
      (a, b) => Date.parse(a.partNo) - Date.parse(b.partNo)
    );
=======
      (a, b) => a.partNo.localeCompare(b.partNo))
    ;
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
  }

  @action loadWarehouses = async () => {
    this.loadingInitial = true;
    try {
      const warehouses = await agent.Warehouses.list();
      runInAction('loading warehouses', () => {
        warehouses.forEach(warehouse => {
          this.warehouseRegistry.set(warehouse.id, warehouse);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction('load Warehouse List error', () => {
        this.loadingInitial = false;
      })
<<<<<<< HEAD
=======
      toast.error('load Warehouse List error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
    }
  };

  @action loadWarehouse = async (id: string) => {
    let warehouse = this.getWarehouse(id);
    if (warehouse) {
      this.warehouse = warehouse;
    } else {
      this.loadingInitial = true;
      try {
        warehouse = await agent.Warehouses.details(id);
        runInAction('getting warehouse',() => {
          this.warehouse = warehouse;
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction('get warehouse error', () => {
          this.loadingInitial = false;
        })
<<<<<<< HEAD
=======
        toast.error('get warehouse error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
        console.log(error);
      }
    }
  }

  @action clearWarehouse = () => {
    this.warehouse = null;
  }

  getWarehouse = (id: string) => {
    return this.warehouseRegistry.get(id);
  }

  @action createWarehouse = async (warehouse: IWarehouse) => {
    this.submitting = true;
    try {
      warehouse.createdAt = new Date().toJSON();
      warehouse.updatedAt = new Date().toJSON();
      await agent.Warehouses.create(warehouse);
      runInAction('create Techncian', () => {
    //    this.warehouseRegistry.set(warehouse.id, warehouse);
        this.submitting = false;
      })
    } catch (error) {
      runInAction('create Warehouse error', () => {
        this.submitting = false;
      })
<<<<<<< HEAD
=======
      toast.error('create Warehouse error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
      console.log(error);
    }
  };

  @action editWarehouse = async (warehouse: IWarehouse) => {
    this.submitting = true;
    try {
      await agent.Warehouses.update(warehouse);
      runInAction('editing warehouse', () => {
        this.warehouseRegistry.set(warehouse.id, warehouse);
        this.warehouse = warehouse;
        this.submitting = false;
      })
    } catch (error) {
      runInAction('edit warehouse error', () => {
        this.submitting = false;
      })
<<<<<<< HEAD
=======
      toast.error('edit warehouse error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
      console.log(error);
    }
  };

  @action deleteWarehouse = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Warehouses.delete(id);
      runInAction('deleting Warehouse', () => {
        this.warehouseRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete Warehouse error', () => {
        this.submitting = false;
        this.target = '';
      })
<<<<<<< HEAD
=======
      toast.error('delete Warehouse error');
>>>>>>> 399497b842e31bfacfdff32494c9ab7a9dfd37b6
      console.log(error);
    }
  }
}

export default createContext(new WarehouseStore());
