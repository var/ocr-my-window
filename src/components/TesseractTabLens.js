import React, { Component } from 'react';
import Tesseract from 'tesseract.js' ;

class TesseractTabLens extends Component {

    constructor(props){
        super(props);

        this.state = {
            capturedImage: null,
            confidence: 0,
            text: '',
            progress: 0
        };
    }

    componentDidMount() {
        this._capture();
    }

    _capture = () => {
        const chrome = window.chrome;
        chrome.tabs.captureVisibleTab({}, dataUrl => {
            this.setState({
                capturedImage: dataUrl
            });
            const job = Tesseract.recognize(dataUrl);

            job.progress(progress => this.setState(progress));
            job.then(result => {
                console.log(result);
                this.setState({
                    confidence: result.confidence,
                    text: result.text,
                });
            });
        });
    };

    _renderText = () => {
        return (
            <div>
                <p>View full result in console of the extension</p>
                <textarea style={{width: '100%'}} rows={15}>
              {this.state.text}
            </textarea>
            </div>)
    };

    render() {
        const { confidence, capturedImage } = this.state;
        const progress = Math.trunc(this.state.progress * 100);
        return (
            <div className="App">
                <img src={capturedImage} width={360} height={240} />
                {progress > 0 && progress < 100 ? <p>{'recognizing... ' + progress + '%'}</p> : ''}
                {confidence > 0 ? this._renderText() : ''}
            </div>
        );
    }
}

export default TesseractTabLens;
