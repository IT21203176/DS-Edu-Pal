import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AllUsers from "./components/AllUsers";
import Student from "./components/Student";
import Instructor from "./components/Instructor";
import Course from "./components/Course";
import CourseList from "./components/CourseList";
import PaymentCourseList from "./components/PaymentCourseList";
import AllCourse from "./components/AllCourse";
import MyCourse from "./components/MyCourse";
import ViewCourse from "./components/ViewCourse";
import Admin from "./components/Admin";
import Nav from "./components/nav";
import Footer from "./components/footer";
import ButterToast, { POS_CENTER , POS_TOP } from "butter-toast";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: "url(/logo123.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Nav />
        <Switch>
          <Route path="/course" component={Course}></Route>
          <Route path="/paymentCourseList" component={PaymentCourseList}></Route>
          <Route path="/courselist" component={CourseList}></Route>
          <Route path="/allcourse" component={AllCourse}></Route>
          <Route path="/myCourse" component={MyCourse}></Route>
          <Route path="/viewCourse/:id" component={ViewCourse}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/student" component={Student}></Route>
          <Route path="/instructor" component={Instructor}></Route>
          <Route path="/allusers" component={AllUsers}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={CourseList}></Route>
        </Switch>
        <ButterToast position={{ vertical: POS_TOP, horizontal: POS_CENTER }} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
