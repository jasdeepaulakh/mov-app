import React, { Component } from 'react';
import { Input, Button, Item, Container } from 'semantic-ui-react'

const apiToken = '6ea2782414922217f4d1fafaa87522bf'
const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiToken + '&query='
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      data: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    fetch(url + this.state.inputValue)
      .then(response => response.json())
      .then(data => this.setState({
        data: data.results
      }))

    console.log(this.state)
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    })
  }
  render() {
    if(this.state.data === null ){
      return(
        <Container>
        <Input value={this.state.inputValue} onChange={e => this.updateInputValue(e)} action={<Button onClick={this.handleClick}>Search</Button>} placeholder='Search...' />
        </Container>
      )
       }
    return (
      <Container>
        <Input value={this.state.inputValue} onChange={e => this.updateInputValue(e)} action={<Button onClick={this.handleClick}>Search</Button>} placeholder='Search...' />
        <Item.Group divided relaxed='very'>
          {this.state.data.map(movie =>
            <Item as='a' key={movie.id}>
              <Item.Image size='tiny' src={'https://image.tmdb.org/t/p/w92' + movie.poster_path} />
              <Item.Content verticalAlign='middle'>
                <Item.Header>{movie.title}</Item.Header>
                <Item.Meta>
                  <span>{movie.release_date}</span>
                </Item.Meta>
                <Item.Description>{movie.overview}</Item.Description>
                <Item.Extra>{movie.vote_average}/10</Item.Extra>
              </Item.Content>
            </Item>
          )}
        </Item.Group>
      </Container>
    );
  }
}

export default App;
