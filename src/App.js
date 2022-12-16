import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import SignIn from "./components/SignIn/SignIn.js";
import Register from "./components/Register/Register.js";
import CardList from "./components/CardList/CardList.js";
import SearchBox from "./components/SearchBox/SearchBox.js";
import Scroll from "./components/Scroll/Scroll.js";
import ErrorBoundry from "./components/ErrorBoundry/ErrorBoundry.js";
import Modal from "./components/Modal/Modal.js";
import TableList from "./components/TableList/TableList.js";
import ParticlesBg from "particles-bg";
import MetaData from "./components/MetaData/MetaData.js";

const initialState = {
  route: "signin",
  isSignedIn: false,
  robots: [],
  courses: [],
  searchfield: "",
  openModal: false,
  modalKind: "",
  delete: false,
  coursesToDelete: [],
  coursesToOpen: "",
  courseClicked: "",
  user: {
    id: "",
    name: "",
    email: "",
    joined: "",
  },
};

class App extends Component {
  // create the state inside the parent application
  constructor() {
    super();
    this.state = {
      route: "signin",
      isSignedIn: false,
      robots: [],
      courses: [],
      searchfield: "",
      openModal: false,
      modalKind: "",
      delete: false,
      coursesToDelete: [],
      coursesToOpen: "",
      courseClicked: "",
      user: {
        id: "",
        name: "",
        email: "",
        joined: "",
      },
    };
  }

  loadUser = (data) => {
    this.setState(
      {
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          joined: data.joined,
        },
      },
      () => {
        // console.log(this.state.user); // dev mode only
        this.onCourseCodes();
        this.onGetCourses();
      }
    );
  };

  //dev mode only to bypas signin
  // autoSignIn = () => {
  //   fetch("https://modest-bike-production.up.railway.app//signin", {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       email: "qjeabinay@tip.edu.ph",
  //       password: "123",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((user) => {
  //       if (user.id) {
  //         this.loadUser(user);
  //         this.onRouteChange("home");
  //       }
  //     });
  // };
  //dev mode only to bypas signin

  resetState = () => {
    this.setState({
      initialState
    });
  };

  onGetCourses = () => {
    fetch(`https://modest-bike-production.up.railway.app/courses/${this.state.user.email}`)
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
  };

  onCourseCodes() {
    fetch("https://modest-bike-production.up.railway.app/modal/courses")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({ courses: response });
        // this.autoSignIn(); //!dev mode only to bypas signin
      });
  }

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState({ isSignedIn: false }, () => {
        this.onOpenModal(false, "");
        this.resetState();
      });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    if (route === "planner") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  onCoursesToDelete = (course) => {
    this.setState({ coursesToDelete: course }, () => {
      console.log("courses to delete", this.state.coursesToDelete);
    });
  };

  onCoursesToOpen = (course) => {
    this.setState({ coursesToOpen: course }, () => {
      console.log("courses to open", this.state.coursesToOpen);
    });
  };

  onOpenModal = (event, modalKind) => {
    this.setState({ openModal: event });
    this.setState({ modalKind: modalKind});
    this.setState({ searchfield: "" });
  };

  onDelete = (event) => {
    this.setState({ delete: event }, () => {
      console.log(this.state.delete);
    });
  };

  render() {
    const { robots, searchfield, courses } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.course.toLowerCase().includes(searchfield.toLowerCase());
    });
    const filteredcourses = robots.filter((course) => {
      return course.id === this.state.coursesToOpen;
    });

    return (
      <div className="App">
        <ParticlesBg
          className="particles"
          bg={true}
          type="cobweb"
          num={50}
          color="#1E9C17"
        />
        <ParticlesBg
          className="particles"
          bg={true}
          type="cobweb"
          num={50}
          color="#D9A714"
        />
        <Navigation
          route={this.state.route}
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
          resetState={this.resetState}
        />
        {this.state.openModal && this.state.isSignedIn === true ? (
          <Modal
            getCourses={this.onGetCourses}
            coursesToDelete={this.state.coursesToDelete}
            courses={courses}
            userEmail={this.state.user.email}
            OpenModal={this.onOpenModal}
            modalKind={this.state.modalKind}
            onConfirmDelete={this.onConfirmDelete}
          />
        ) : this.state.route === "home" ? (
          <div>
            <Logo />
            <div>
              <SearchBox
                Delete={this.onDelete}
                SearchChange={this.onSearchChange}
                OpenModal={this.onOpenModal}
              />
              <br />
              <hr className="b--green" />
              <br />
              {!robots.length ? (
                <h1>You don't have any courses...</h1>
              ) : (
                <Scroll>
                  {/* created an ErrorBoundry for CardList component */}
                  <ErrorBoundry>
                    <CardList
                      onRouteChange={this.onRouteChange}
                      onCoursesToOpen={this.onCoursesToOpen}
                      onCoursesToDelete={this.onCoursesToDelete}
                      robots={filteredRobots}
                      deleteMode={this.state.delete}
                    />
                  </ErrorBoundry>
                </Scroll>
              )}
            </div>
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : this.state.route === "planner" ? (
          <>
            <MetaData filteredcourses={filteredcourses} />
            {/* <Scroll> */}
            <TableList
              // filteredcourses={filteredcourses}
              coursesToOpen={this.state.coursesToOpen}
            />
            {/* </Scroll> */}
          </>
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
