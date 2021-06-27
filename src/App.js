import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './App.css';
import Calendar from './Components/Calendar/';

class App extends React.Component {
  onDayClick = (event,day) =>{
    
  }
  render() {
    return (
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Calendar  style={{ backgroundColor: '#cfe8fc'}}  onDayClick={(event, day) => {this.onDayClick(event,day)}}/>
      </Container>
     </React.Fragment>
        
      
    );
  }
}

export default App;
