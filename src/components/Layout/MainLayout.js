import { Content, Header, Sidebar } from 'components/Layout';
import React from 'react';
import { Route } from 'react-router-dom';
import { MyCompanies, AllCompanies, SingleCompany } from '../Pages/Companies';
import { AddProcedure, AllProcedures, ViewProcedure, EditProcedure } from '../Pages/Procedures';
import { CreateForm, EditForm, AllForms, ViewForm } from '../Pages/Forms';
import CreateUser from "../Pages/Dashboard/CreateUsers";
import ViewUser from "../Pages/Dashboard/ViewUser";
import Overview from "../Pages/Dashboard/Overview";

class MainLayout extends React.Component {
  static isSidebarOpen() {
    return document
      .querySelector('.cr-sidebar')
      .classList.contains('cr-sidebar--open');
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);
  }

  handleContentClick = event => {
    if (
      MainLayout.isSidebarOpen() &&
      (this.props.breakpoint === 'xs' ||
        this.props.breakpoint === 'sm' ||
        this.props.breakpoint === 'md')
    ) {
      this.openSidebar('close');
    }
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case 'xs':
      case 'sm':
      case 'md':
        return this.openSidebar('close');

      case 'lg':
      case 'xl':
      default:
        return this.openSidebar('open');
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === 'open') {
      return document
        .querySelector('.cr-sidebar')
        .classList.add('cr-sidebar--open');
    }
    document.querySelector('.cr-sidebar').classList.remove('cr-sidebar--open');
  }

  render() {
    return (
      <main className="cr-app bg-light">
        <Sidebar />
        <Content fluid onClick={this.handleContentClick}>
          <Header />
          <Route exact path="/dashboard" component={Overview} />
          <Route exact path="/dashboard/create_user" component={CreateUser} />
          <Route exact path="/dashboard/view_user" component={ViewUser} />
          <Route exact path="/dashboard/my_companies" component={MyCompanies} />
          <Route exact path="/dashboard/all_companies" component={AllCompanies} />
          <Route path='/dashboard/company/:id' render={(props) => <SingleCompany {...props} />} />
          <Route exact path="/dashboard/add_procedure" component={AddProcedure} />
          <Route exact path="/dashboard/all_procedures" component={AllProcedures} />
          <Route path='/dashboard/procedure/:id' render={(props) => <ViewProcedure {...props} />} />
          <Route path='/dashboard/editprocedure/:id' render={(props) => <EditProcedure {...props} />} />
          <Route exact path="/dashboard/create_forms" component={CreateForm} />
          <Route exact path="/dashboard/all_forms" component={AllForms} />
          <Route exact path="/dashboard/edit_forms/:id" render={(props) => <EditForm {...props} />} />
          <Route exact path="/dashboard/view_form/:id" render={(props) => <ViewForm {...props} />} />
        </Content>
      </main>
    );
  }
}

export default MainLayout;
