import React from "react";
import "./SignIn.css";
import { TextField } from "@mui/material";
import profLanner from "../Logo/logo_transparent_.png";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      error: ""
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:6060/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          // this.props.getCourses();
          this.props.onRouteChange("home");
          this.setState({error:""})
        }
        else{
          this.setState({error: "error"})
        }
      });
  };

  onEnterPress = (event) => {
    if (event.keyCode === 13) {
      this.onSubmitSignIn();
    }
  };

  render() {
    return (
      <article className="br3 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa3 black-80">
          <img
            style={{ width: "250px", height: "80px", objectFit: "cover" }}
            src={profLanner}
            alt="Logo"
          />
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <hr />
              <div className="mt3">
                {/* <label className="db fw6 lh-copy f6" for="email-address">
									Email
								</label> */}
                {/* <input
                  onChange={this.onEmailChange}
                  onKeyDown={this.onEnterPress}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--dark-green"
                  type="email"
                  name="email-address"
                  id="email-address"
                /> */}
                <TextField
                  className="pa2 input-reset ba bg-transparent w-120 b--dark-green"
                  onChange={this.onEmailChange}
                  onKeyDown={this.onEnterPress}
                  required
                  name="email"
                  value={this.state.signInEmail}
                  label="Email"
                  variant="standard"
                  helperText="Enter your email"
                  fullWidth={true}
                />
              </div>
              <div className="mv3">
                {/* <label className="db fw6 lh-copy f6" for="password">
									Password
								</label> */}
                {/* <input
									onKeyDown={this.onEnterPress}
									onChange={this.onPasswordChange}
									onKeyPress={this.onEnterPress}
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100
                  b--dark-green"
									type="password"
									name="password"
									id="password"
								/> */}
                <TextField
                  className="pa2 input-reset ba bg-transparent w-120 b--dark-green"
                  onChange={this.onPasswordChange}
                  onKeyDown={this.onEnterPress}
                  required
                  name="password"
                  value={this.state.signInPassword}
                  label="password"
                  type="password"
                  helperText="Enter your password"
                  variant="standard"
                  fullWidth={true}
                />
              </div>
            </fieldset>
            {this.state.error === "error" ? (
                  <p style={{color: "red", marginBottom: "25px"}}>ERROR: UNABLE TO SIGN IN</p>
                ):(" ")}
            <Stack spacing={2} direction="column">
              <Button 
              style = {{background: "rgb(245, 89, 11)"}}
              variant="contained"
              onClick={this.onSubmitSignIn}
              >sign in</Button>
            <Button 
            style = {{color: "rgb(245, 89, 11)"}}
            variant="text"
            onClick={() => this.props.onRouteChange("register")}
            >Register</Button>
            </Stack>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
