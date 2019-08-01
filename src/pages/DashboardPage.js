import React from 'react';
import Page from 'components/Page';


class DashboardPage extends React.Component {
  componentWillMount(){
    let auth = JSON.parse(localStorage.getItem('app'));
      if (auth !== null) {
        const jwt = auth.jwt_token;
        if (jwt === '') {
            this.props.history.push('/login');
        }
    } else {
            this.props.history.push('/login');
    }
  }
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
export default DashboardPage;
