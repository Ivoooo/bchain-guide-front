import React from "react";
import logo from "./logo.svg";
import styled from "styled-components";


export const InputField = styled.input`
  &::placeholder {
    color: #633e1d;
  }
  color: #633e1d;
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border-radius: 37px;
  margin-bottom: 20px;
  border: 1px solid #633e1d;
  background-color: #fefdfb;
`;

export const Button = styled.button`
  &:hover {
    transform: ${props => (props.disabled ? "none" : "translateY(-2px)")}
  };
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgb(255,255,255);
  width: ${props => props.width || null};
  min-height: 35px;
  min-width: 120px;
  border: 1px solid #633e1d;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  background-color: ${props => (props.disabled ? "#cc8579" : "#00b3e3")};
  transition: all 0.3s ease;
`;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "127.0.0.1"
        };
    }

    api() {
        let url = this.state['ip'] + "/test/"
        console.log(url)
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": true,
            },
            body: JSON.stringify({
                test_data: 665,
            })
        })
            .then(response => {
                console.log(response.body)
                if(response.ok) {
                    console.log(response.data)
                    alert('It works! See console log for more information')
                }
                else {
                    throw response
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong when trying to connect. See console log for more information");
            })
    }

    componentDidMount() {
        this.setState({ip: "127.0.0.1"})
    }

    render() {
        return (
            <>
                <img src={logo} className="App-logo" alt="logo" />
                <InputField
                    placeholder="Enter the IP address of the Server here (without ports)"
                    type = "ip"
                    onChange={e => {
                        this.setState({ip: e.target.value});
                    }}
                />
                <Button
                    width="50%"
                    onClick={() => {
                        this.api();
                    }}
                >
                    The website works! Press this button to see if you can connect to the backend! Make sure you enter the IP above first
                </Button>
            </>
        )
    }
}

export default Home;