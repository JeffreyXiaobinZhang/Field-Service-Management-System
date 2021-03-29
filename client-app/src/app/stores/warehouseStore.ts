import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, MouseEvent } from 'react';
import { toast } from 'react-toastify';
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
      (a, b) => a.partNo.localeCompare(b.partNo))
    ;
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
      toast.error('load Warehouse List error');
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
        toast.error('get warehouse error');
        console.log(error);
      }
    }
  }

  @action clearWarehouse = () => {
    this.warehouse = null;
  }

  getWarehouse = (id: string) => {
    return this.warehouseRegistry.get(Number(id));
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
      toast.error('create Warehouse error');
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
      toast.error('edit warehouse error');
      console.log(error);
    }
  };

  @action deleteWarehouse = async (id: string) => {
    this.submitting = true;
    this.target = id;
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
      toast.error('delete Warehouse error');
      console.log(error);
    }
  }
}

export default createContext(new WarehouseStore());
