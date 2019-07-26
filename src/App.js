import React, { Component } from 'react';
import './App.css';
import TesseractTabLens from "./components/TesseractTabLens";
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

class App extends Component {

  render() {
    return (
            <Tabs justified={true}>
                <Tab value="pane-1" label="Tesseract.js"><TesseractTabLens /></Tab>
            </Tabs>
    )
  }
}

export default App;
