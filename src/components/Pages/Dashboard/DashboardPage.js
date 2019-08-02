import React from 'react';
import Page from '../../Breadcrumbs/Page';
import { withRouter } from 'react-router';


class DashboardPage extends React.Component {
  render() {
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >

      </Page>
    );
  }
}
export default withRouter(DashboardPage);
