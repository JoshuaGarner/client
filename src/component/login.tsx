import React = require("react")
import {Base64Img} from "./"
import {Glyphicon, Button, Input} from "react-bootstrap"
import {connect, disconnect} from "../socket"
import {appActions} from "../action"
import {verticalCenter, media} from "../util"
import MediaQuery = require("react-responsive")

export class LoginScreen extends React.Component<{
    username?: string,
    avatar?: string,
    onLogin?: (pwd: string) => void
}, {
    password: string
}> {
    render() {
        const loginButton = 
            <Button 
            bsStyle="primary" 
            onClick={() => this.props.onLogin(this.state.password)}>
                <Glyphicon glyph="arrow-right" />
            </Button>
        return <div style={_.assign(verticalCenter(300, 350), {textAlign: "center", display: "table-cell", verticalAlign: "middle"})}>
            <Base64Img type="image/png" className="img-circle" data={this.props.avatar} />
            <h2>{this.props.username}</h2>
            <br />
            <Input 
                type="password" 
                placeholder="Password" 
                buttonAfter={loginButton} 
                onChange={(e) => this.setState({password: e.target.value})}
                onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                        this.props.onLogin(this.state.password)
                    }
                }}/>
            <br />
            <Button bsStyle="link" onClick={disconnect}><Glyphicon glyph="arrow-left" /> &nbsp; Disconnect</Button>
        </div>
    }
}

export class ConnectScreen extends React.Component<{}, {
    host?: string,
    port?: string
}> {
    componentDidMount() {
        this.setState({host: "localhost", port: "22007"})
        connect("localhost", "22007")
    }
    inner() {
        return <div>
            <h1>Connect to Ulterius</h1>
            <br />
            <div className="row">
                <div className="col-sm-8">
                    <Input type="text" defaultValue="localhost" placeholder="host" onChange={e => this.setState({host: e.target.value})} />
                </div>
                <div className="col-sm-4">
                    <Input type="text" defaultValue="22007" placeholder="port" onChange={e => this.setState({port: e.target.value})} />
                </div>
            </div>
            <Button bsStyle="primary" onClick={() => connect(this.state.host, this.state.port)}><Glyphicon glyph="arrow-right" /></Button>
        </div>
    }
    render() {
        
        return <div>
            <MediaQuery minWidth={media.sm.min}>
                <div style={_.assign(verticalCenter(400, 200), {textAlign: "center"})}>
                    {this.inner()}
                </div>
            </MediaQuery>
            <MediaQuery maxWidth={media.xs.max}>
                <div style={_.assign(verticalCenter("80%", 300), {textAlign: "center"})}>
                    {this.inner()}
                </div>
            </MediaQuery>
        </div>
        
        /*
        return <div style={{display: "table-cell", verticalAlign: "middle"}}>
            <h1>Connect to Ulterius</h1>
            <br />
            <div className="row">
                <div className="col-sm-8">
                    <Input type="text" defaultValue="localhost" placeholder="host" onChange={e => this.setState({host: e.target.value})} />
                </div>
                <div className="col-sm-4">
                    <Input type="text" defaultValue="22007" placeholder="port" onChange={e => this.setState({port: e.target.value})} />
                </div>
            </div>
            <Button bsStyle="primary" onClick={() => connect(this.state.host, this.state.port)}><Glyphicon glyph="arrow-right" /></Button>
        </div>
        */
    }
}