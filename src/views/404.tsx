import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import LinkButton from 'components/LinkButton';
import PoopIcon from 'mdi-material-ui/EmoticonPoop';
import { strings } from 'localization';

class NotFound extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center', padding: 80}}>
        <PoopIcon style={{ width: 80, height: 80, fill: '#1f2e44' }}/>
        <Typography variant="display2" gutterBottom>404</Typography>
        <Typography variant="headline">{strings.notFound.error}</Typography>
        <LinkButton component={Link} variant="contained" color="primary" to="/" style={{ marginTop: 32}}>
          {strings.notFound.backHome}
        </LinkButton>
      </div>
    );
  }
}

export default NotFound;
