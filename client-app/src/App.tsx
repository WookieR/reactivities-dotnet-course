import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';
// import { render } from '@testing-library/react';

class App extends Component {

  state = {
    values: []
  }

  componentDidMount() {

    axios.get('http://localhost:5000/api/values').then( resp => {
      this.setState({
        ...this.state,
        values: [ ...this.state.values, ...resp.data]
      });

    }).catch( err => {
      console.log(err);
    })
  }

  render(){
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
        {
          this.state.values.map( (value: any) => (
            <List.Item key={value.id}> {value.name} </List.Item>
          ))
        }
        </List>
      </div>
    )
  }
  
}

export default App;
