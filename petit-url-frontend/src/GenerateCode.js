import React from 'react';

export default class GenerateCode extends React.Component {

    constructor(props) {
        super()        
        this.state ={
            inputLink: '',
            theCode: '',
            petitUrl: '[Generated Url]',
        }                
    }
    
    onGenerateCode=()=>{                
        let url = this.state.inputLink.trim();        
        fetch('http://petiturl.fr:5000/generatePetitURL', {
            method: 'POST',
            headers: {                
                'Content-Type': 'application/json'                                
            },
            body: JSON.stringify({
                'url': url
            })           
        })
        .then(response => {            
            console.log('Post Executed');
            console.log(response);
            if(response.ok){
                const jsonPromise = response.json();
                jsonPromise.then(data => {                    
                    console.log("URL code", data.code); 
                    this.setState({
                        inputLink: '',
                        theCode: data.code
                      });                   
                    this.updatePetitUrl()
                })
            }
        })
        .catch(error =>{
            console.log('ERROR executing Post');            
            console.log(error);
        });        
    }

    render() {
        return(                     
            <div className="col-lg-6">                            
                    <div className="form-row">
                    <div className="col-9">                
                        <input value={this.state.inputLink} onChange={evt => this.updateTheLink(evt)} type="text" className="form-control" placeholder="Shorten your link"/>
                    </div>
                    <div className="col">
                        <button className="btn btn-light" onClick={this.onGenerateCode}>Shorten</button>
                    </div>
                    </div>
                    <p>{this.state.petitUrl}</p>                                   
            </div>                
        )
    }

    updateTheLink(evt) {
        this.setState({
            inputLink: evt.target.value
        });
    }

    updatePetitUrl() {
        this.setState({
            petitUrl: this.buildLink(this.state.theCode)
        });
    }

    buildLink(code){    
        const petitUrlHost = 'http://petiturl.fr:5000/';    
        return petitUrlHost.concat(code)
    }    

}
