import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Button, Card, Typography, Box } from '@material-ui/core'
import { useHistory } from "react-router-dom"

function ViewCourse(props) {

  const [course_data, setCourseData] = useState([]);
  const [lec1, setLec1] = useState(false);
  const [lec2, setLec2] = useState(false);
  const [lec3, setLec3] = useState(false);
  const [statuts, setStatuts] = useState("");
  let history = useHistory();

  useEffect(async () => {
    await onReload()
    if (localStorage.getItem('user_session')) {

    } else {
      history.push("/login")
    }
  }, []);

  const onReload = async () => {

    console.log(props.match.params.id)
    const url = "http://localhost:8004/course/" + props.match.params.id
    await axios
      .get(url)
      .then((response) => {
        console.log(response["data"])
        setCourseData(response["data"])
      })
    const url1 = "http://localhost:8002/Learner/status/" + props.match.params.id + "/" + localStorage.getItem("id");
    await axios
      .get(url1)
      .then((response) => {
        console.log(response["data"])
        setStatuts(response["data"].status)
      })
  }

  const l_n_click = async (id) => {
    console.log(id)
    if (id == 1) {
      setLec1(true)
      const url = "http://localhost:8002/Learner";
      const data = JSON.stringify({
        course_id: props.match.params.id,
        user_id: localStorage.getItem("id"),
        lec1: true
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res.data.data);
        });
    } else if (id == 2) {
      setLec2(true)
      const url = "http://localhost:8002/Learner";
      const data = JSON.stringify({
        course_id: props.match.params.id,
        user_id: localStorage.getItem("id"),
        lec2: true
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res.data.data);
        });
    } else if (id == 3) {
      setLec3(true)
      const url = "http://localhost:8002/Learner";
      const data = JSON.stringify({
        course_id: props.match.params.id,
        user_id: localStorage.getItem("id"),
        lec3: true
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async (res) => {
          console.log(res.data.data);
        });
    }
  }

  return (
    <div>
      <Typography gutterBottom variant="h3" align="center">
        Course Details
      </Typography>
      <Card style={{ maxWidth: 80 + '%', padding: "20px 20px", margin: "0 auto" }}>
        <div class="container">
          <br /><br />
          <div class="justify-content-center">

            <h2>Course Statuts</h2>
            <h4>{statuts}</h4>
            <hr />
            <div class="card">
              <br />
              <h5 class="card-title">{"Course Name : " + course_data.name}</h5>
              <hr />
              <h5 class="card-title">{"Quiz Details : " + course_data.quiz_details}</h5>
              <hr />
              {course_data.video_link && (
                <div style={{ width: '350px', height: '250px' }}>
                  <video controls style={{ width: '100%', height: '100%' }}>
                    <source src={"http://localhost:8004/" + course_data.video_link} type="video/mp4" />
                  </video>
                </div>)}
              <hr />
              <h5 onClick={() => l_n_click(1)}>Lecture Lecture 1</h5>
              {lec1 && (
                <p>{course_data.lec1}</p>
              )}
              <hr />
              <h5 onClick={() => l_n_click(2)}>Lecture Lecture 2</h5>
              {lec2 && (
                <p>{course_data.lec2}</p>
              )}
              <hr />
              <h5 onClick={() => l_n_click(3)}>Lecture Lecture 3</h5>
              {lec3 && (
                <p>{course_data.lec3}</p>
              )}
              <hr />
            </div>
          </div>
        </div>
      </Card>
      <br />
    </div>
  );

}

export default ViewCourse;

