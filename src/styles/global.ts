import { createStyles } from '@material-ui/core';

export default createStyles({
    '@global': {
      html: {
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
        fontSize: '62.5%'
      },
      
      '*, *:before, *:after': {
        boxSizing: 'inherit',
      },
      body: {
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
        fontFamily: [
          'Lato',
          'sans-serif',
          '-apple-system',
          'BlinkMacSystemFont',
        ].join(','),
      },
      '#root': {
        width: '100%',
        height: '100%',
      },
      a: {
        color: 'inherit',
        textDecoration: 'none',
      }
    }
});