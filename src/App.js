import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import FileList from './FileList';

class App extends Component {

  state = {
    currentFiles: [],
    isDoneUploading: false
  }

  getFiles = () => 
    fetch('http://localhost:3000/api/files')
    .then(res => res.json())
    .then(({ files }) => this.setState({ currentFiles: files }));
  
  componentDidMount() {
    this.getFiles();
  }

  handleUpload = event => {
    event.preventDefault();
    const data = new FormData();
    console.log([...this.uploadInput.files]);
    data.append('photo', this.uploadInput.files[0]);
    data.append('name', 'cats.jpg');

    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: data
    }).then(() => {
      this.getFiles();
      this.setState({ isDoneUploading: true })
    })
  }

  renderImages = () => {
    return this.state.currentFiles.map(file => (
      <li key={file.name}>
        {file.name}
        <img
          src={file.url}
          style={{
            height: '200px'
          }}
        />
      </li>
    ));
  }

  render() {
    return (
      <div className="App">
        <Header />
        <h2>Current files</h2>
        <ul>
          {/* {this.renderImages()} */}
        </ul>
        <FileList files={this.state.currentFiles} />
        <form onSubmit={this.handleUpload}> 
          <input ref={ref => this.uploadInput = ref} type="file" />
          <input type="submit" value="Upload Photo"/>
        </form>
        {
          this.state.isDoneUploading && <h1>Done Uploading!</h1>
        }
      </div>
    );
  }
}

export default App;
