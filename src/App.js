import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';

import './App.css';


 
const particleOpt = {
  particles: {
    number:{
      value :30,
      density:{
        enable: true,
        value_area : 500
      }
    }
  }
}

const initialState = {
    input:'',
    imageURL:'',
    box: {},
    route : 'signin',
    isSignedIn : false,
    user :{
          id : '',
          name : '',
          email : '',
          entries : 0,
          joined : ''
    }
  }


class App extends Component {

  constructor(){
    super();
    this.state= initialState;
  }

  LoadUser = (data) =>{
  this.setState({user: {
            id : data.id,
            name : data.name,
            email : data.email,
            entries : data.entries,
            joined : data.joined
  }})
}

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height) 
      }
  }

displayFaceBox = (box) =>{ 
  console.log('app.js',box);
  this.setState({box : box});
}

  onInputChange = (event) =>{
   this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    // to set image to img element in Face regognition
    this.setState({imageURL: this.state.input})
    
    //give same image to input model
  //here input only shall be there,imageURL wont work
    fetch('http://localhost:3000/imageurl',{
    method: 'post',
    headers  : {'Content-type' : 'application/json'},
    body : JSON.stringify({
         input : this.state.input
      })
    })
    .then(response => response.json())
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image',{
            method: 'put',
            headers  : {'Content-type' : 'application/json'},
            body : JSON.stringify({
                 id : this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log )
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(error => console.log(error));
      }
    
   onRouteChange = (route) =>{
     if(route ==='home'){
       this.setState({isSignedIn : true});
     }
     else if(route ==='signout'){
      this.setState(initialState);
    }
     this.setState({route : route})
   }   
  render() {
    const  { isSignedIn, box, imageURL, route} = this.state;
    return (
      <div className='App'>
          <Particles className='particles'
              params={ particleOpt }
            />
        <Navigation 
        isSignedIn={isSignedIn}
        onRouteChange={this.onRouteChange} />
       {
         this.state.route === 'home'
         ? <div>
         <Logo />
         <Rank name={this.state.user.name} entries={this.state.user.entries} />
         <ImageLinkForm
           onInputChange={this.onInputChange}
           onButtonSubmit={this.onButtonSubmit}
         />
         <FaceRecognition box={box} imageURL={imageURL} />
       </div>
         : (
            route === 'signin'
            ?<Signin LoadUser={this.LoadUser} 
            onRouteChange={this.onRouteChange}/>
            :<Register LoadUser={this.LoadUser} 
            onRouteChange={this.onRouteChange}/>
         )
       }
        </div>
    
    );
  }
}

export default App;
