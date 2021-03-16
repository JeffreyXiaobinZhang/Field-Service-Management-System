import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBarDaily from '../../frontpages/dailymanagement/NavBarDaily';
import NavBarProject from '../../frontpages/projectmanagement/NavBarProject';
import NavBarHRmanagement from '../../frontpages/hrmanagement/NavBarHRmanagement';
import NavBarEmployee from '../../frontpages/technicianportal/NavBarEmployee';
import SORListDashboard from '../../frontpages/dailymanagement/sorlists/SORListDashboard';
import ProjectDashboard from '../../frontpages/projectmanagement/bdod/ProjectDashboard';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../frontpages/home/Home';
import SORListEditForm from '../../frontpages/dailymanagement/sorlists/SORListEditForm';
import SORListDetails from '../../frontpages/dailymanagement/sorlists/SORListDetails';
import SORListCreateForm from '../../frontpages/dailymanagement/sorlists/SORListCreateForm';
import ProjectEditForm from '../../frontpages/projectmanagement/bdod/ProjectEditForm';
import ProjectDetails from '../../frontpages/projectmanagement/bdod/ProjectDetails';
import ProjectCreateForm from '../../frontpages/projectmanagement/bdod/ProjectCreateForm';
import TechnicianDashboard from '../../frontpages/hrmanagement/technicians/TechnicianDashboard';
import TechnicianEditForm from '../../frontpages/hrmanagement/technicians/TechnicianEditForm';
import TechnicianDetails from '../../frontpages/hrmanagement/technicians/TechnicianDetails';
import TechnicianCreateForm from '../../frontpages/hrmanagement/technicians/TechnicianCreateForm';
import WarehouseEditForm from '../../frontpages/dailymanagement/warehouses/WarehouseEditForm';
import WarehouseDetails from '../../frontpages/dailymanagement/warehouses/WarehouseDetails';
import WarehouseCreateForm from '../../frontpages/dailymanagement/warehouses/WarehouseCreateForm';
import WarehouseDashboard from '../../frontpages/dailymanagement/warehouses/WarehouseDashboard';
import InvoiceEditForm from '../../frontpages/dailymanagement/invoices/InvoiceEditForm';
import InvoiceDetails from '../../frontpages/dailymanagement/invoices/InvoiceDetails';
import InvoiceCreateForm from '../../frontpages/dailymanagement/invoices/InvoiceCreateForm';
import InvoiceDashboard from '../../frontpages/dailymanagement/invoices/InvoiceDashboard';
import CertificateDashboard from '../../frontpages/hrmanagement/certificates/CertificateDashboard';
import CertificateEditForm from '../../frontpages/hrmanagement/certificates/CertificateEditForm';
import CertificateDetails from '../../frontpages/hrmanagement/certificates/CertificateDetails';
import CertificateCreateForm from '../../frontpages/hrmanagement/certificates/CertificateCreateForm';
import TechnicianCertificateDashboard from '../../frontpages/hrmanagement/techniciancertificates/TechnicianCertificateDashboard';
import TechnicianCertificateEditForm from '../../frontpages/hrmanagement/techniciancertificates/TechnicianCertificateEditForm';
import TechnicianCertificateDetails from '../../frontpages/hrmanagement/techniciancertificates/TechnicianCertificateDetails';
import TechnicianCertificateCreateForm from '../../frontpages/hrmanagement/techniciancertificates/TechnicianCertificateCreateForm';
import Thirdlist from '../../frontpages/dailymanagement/third/Thirdlist';
import Thirddetail from '../../frontpages/dailymanagement/third/Thirddetail';
import Thirdedit from '../../frontpages/dailymanagement/third/Thirdedit';
import Thirdadd from '../../frontpages/dailymanagement/third/Thirdadd';
import LoginForm from '../../frontpages/user/LoginForm';
import LoginPage from '../../frontpages/home/LoginPage';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import TechnicianRateDashboard from '../../frontpages/hrmanagement/technicianrates/TechnicianRateDashboard';
import TechnicianRateEditForm from '../../frontpages/hrmanagement/technicianrates/TechnicianRateEditForm';
import TechnicianRateDetails from '../../frontpages/hrmanagement/technicianrates/TechnicianRateDetails';
import TechnicianRateCreateForm from '../../frontpages/hrmanagement/technicianrates/TechnicianRateCreateForm';


const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser, user } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={LoginPage} />
      <Route path='/login' component={LoginForm} />
      {  (user) && (user.role === 'Admin')  && <Route exact path='/home' component={HomePage} />}
      <Route
        // path={'/(.+)'}
        path={'/dailymanagement'}
        render={() => (user) && (user.role === 'Admin') && (
          <Fragment>
            <NavBarDaily />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/dailymanagement/sorlist' component={SORListDashboard} />
              <Route path='/dailymanagement/sorlist/:id' component={SORListDetails} />
              <Route path='/dailymanagement/sorlist-create' component={SORListCreateForm} />
              <Route path='/dailymanagement/sorlist-edit/:id' component={SORListEditForm} />

              <Route exact path='/dailymanagement/warehouse' component={WarehouseDashboard} />
              <Route path='/dailymanagement/warehouse/:id' component={WarehouseDetails} />
              <Route path='/dailymanagement/warehouse-create' component={WarehouseCreateForm} />
              <Route path='/dailymanagement/warehouse-edit/:id' component={WarehouseEditForm} />

              <Route exact path='/dailymanagement/invoice' component={InvoiceDashboard} />
              <Route path='/dailymanagement/invoice/:id' component={InvoiceDetails} />
              <Route path='/dailymanagement/invoice-create' component={InvoiceCreateForm} />
              <Route path='/dailymanagement/invoice-edit/:id' component={InvoiceEditForm} />

              <Route exact path='/dailymanagement/third' component={Thirdlist} />
              <Route path='/dailymanagement/third/:name' component={Thirddetail} />
              <Route path='/dailymanagement/third-edit/:name' component={Thirdedit} />
              <Route path='/dailymanagement/thirdAdd/' component={Thirdadd} />
            </Container>
          </Fragment>
        )}
      />

      <Route
        // path={'/(.+)'}
        path={'/hrmanagement'}
        render={() => (user) && (user.role === 'Admin') && (
          <Fragment>
            <NavBarHRmanagement />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/hrmanagement/technician' component={TechnicianDashboard} />
              <Route path='/hrmanagement/technician/:id' component={TechnicianDetails} />
              <Route path='/hrmanagement/technician-create' component={TechnicianCreateForm} />
              <Route path='/hrmanagement/technician-edit/:id' component={TechnicianEditForm} />

              <Route exact path='/hrmanagement/certificate' component={CertificateDashboard} />
              <Route path='/hrmanagement/certificate/:id' component={CertificateDetails} />
              <Route path='/hrmanagement/certificate-create' component={CertificateCreateForm} />
              <Route path='/hrmanagement/certificate-edit/:id' component={CertificateEditForm} />

              <Route exact path='/hrmanagement/techniciancertificate' component={TechnicianCertificateDashboard} />
              <Route path='/hrmanagement/techniciancertificate/:id' component={TechnicianCertificateDetails} />
              <Route path='/hrmanagement/techniciancertificate-create' component={TechnicianCertificateCreateForm} />
              <Route path='/hrmanagement/techniciancertificate-edit/:id/:technicianId/:certificateId/:expiryDate/:remark/' component={TechnicianCertificateEditForm} />
              
              <Route exact path='/hrmanagement/technicianrate' component={TechnicianRateDashboard} />
              <Route path='/hrmanagement/technicianrate/:id' component={TechnicianRateDetails} />
              <Route path='/hrmanagement/technicianrate-create' component={TechnicianRateCreateForm} />
              <Route path='/hrmanagement/technicianrate-edit/:id' component={TechnicianRateEditForm} />
            </Container>
          </Fragment>
        )}
      />

      <Route
        // path={'/(.+)'}
        path={'/projectmanagement'}
        render={() => (user) && (user.role === 'Admin') && (
          <Fragment>
            <NavBarProject />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/projectmanagement/project' component={ProjectDashboard} />
              <Route path='/projectmanagement/project/:id' component={ProjectDetails} />
              <Route path='/projectmanagement/project-create' component={ProjectCreateForm} />
              <Route path='/projectmanagement/project-edit/:id' component={ProjectEditForm} />
            </Container>
          </Fragment>
        )}
      />

      <Route
        // path={'/(.+)'}
        path={'/employeeportal'}
        render={() => (
          <Fragment>
            <NavBarEmployee />
            {/* <Container style={{ marginTop: '7em' }}>
              <Route exact path='/projectmanagement/project' component={ProjectDashboard} />
              <Route path='/projectmanagement/project/:id' component={ProjectDetails} />
              <Route path='/projectmanagement/project-create' component={ProjectCreateForm} />
              <Route path='/projectmanagement/project-edit/:id' component={ProjectEditForm} />
            </Container> */}
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
