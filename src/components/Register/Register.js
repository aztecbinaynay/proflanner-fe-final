import React from "react";
import "./Register.css";
import profLanner from "../Logo/logo_transparent_.png";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      error: ""
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("http://localhost:6060/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          // this.props.getCourses();
          this.setState({error:""});
          this.props.onRouteChange("home");
        }
        else{
          this.setState({error:"error"});
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
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
        <main className="pa3 black-80">
          <img
            style={{ width: "250px", height: "80px", objectFit: "cover" }}
            src={profLanner}
            alt="Logo"
          />
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <hr />
              <div className="mt3">
                <label
                  className="db fw6 lh-copy f6"
                  for="name"
                  type="text"
                  name="name"
                  id="name"
                >
                  Name
                </label>
                <input
                  onKeyDown={this.onEnterPress}
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100
                  b--dark-green"
                  type="email"
                  name="email-address"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" for="email-address">
                  Email
                </label>
                <input
                  onKeyDown={this.onEnterPress}
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100
                  b--dark-green"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" for="password">
                  Password
                </label>
                <input
                  onKeyDown={this.onEnterPress}
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100
                  b--dark-green"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            {this.state.error === "error" ? (
                  <p style={{color: "red", marginBottom: "25px"}}>ERROR: UNABLE TO REGISTER</p>
                ):(" ")}
            <Stack spacing={2} direction="row">
              <Button
                onClick={this.onSubmitSignIn}
                style={{ background: "rgb(245, 89, 11)" }}
                variant="contained"
              >
                Register
              </Button>
              <Button
                onClick={() => this.props.onRouteChange("signin")}
                style={{ color: "rgb(245, 89, 11)" }}
                variant="text"
              >
                Sign in
              </Button>
            </Stack>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
