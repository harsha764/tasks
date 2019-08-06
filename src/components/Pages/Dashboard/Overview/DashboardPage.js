import React from 'react';
import Page from '../../../Breadcrumbs/Page';


class Overview extends React.Component {
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
export default Overview;
