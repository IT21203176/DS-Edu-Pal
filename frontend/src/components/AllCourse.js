import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import MaterialTable from 'material-table'
import ButterToast, { Cinnamon } from "butter-toast"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { Grid, TextField, Button, Card, Typography, Box } from '@material-ui/core'
import { useHistory } from "react-router-dom"

function AllCourse() {

  const [courseData, setCourseData] = useState([]);
  let history = useHistory();

  useEffect(async () => {
    onReload()
    if (localStorage.getItem('user_session')) {

    } else {
      history.push("/login")
    }
  }, []);

  const onReload = () => {
    const url = "http://localhost:8004/Course";
    axios
      .get(url)
      .then((response) => setCourseData(response["data"]));
  }

  const validation = (name,lec1, lec2, lec3, note4, note5, price, quiz_details) => {

    var Error = false;

    if (name === "") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
          content="Course Name Required!"
          scheme={Cinnamon.Crisp.SCHEME_RED}
          icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }

    if (price === "") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
          content="Course Fee Required!"
          scheme={Cinnamon.Crisp.SCHEME_RED}
          icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }

    if (lec1 === "") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
          content="Course Lecture 1 Required!"
          scheme={Cinnamon.Crisp.SCHEME_RED}
          icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }

    if (lec2 === "") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
          content="Lec2 Required!"
          scheme={Cinnamon.Crisp.SCHEME_RED}
          icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }

    if (lec3 === "") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
          content="Lec3 Required!"
          scheme={Cinnamon.Crisp.SCHEME_RED}
          icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }

    if (quiz_details === "") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
          content="Due Months Required!"
          scheme={Cinnamon.Crisp.SCHEME_RED}
          icon={<ErrorOutlineIcon />}
        />
      })
      Error = true;
    }

    if (Error) {
      return false;
    }

    return true;
  }


  const Form_Sub_Fun = async (newRow, oldRow) => {
    if (validation(newRow['lec1'], newRow['lec2'], newRow['lec3'], newRow['note4'], newRow['note5'], newRow['price'], newRow['quiz_details'])) {

      const url = "http://localhost:8004/Course/" + oldRow['_id'];
      const data = await JSON.stringify({
        name: newRow['name'],
        price: newRow['price'],
        lec1: newRow['lec1'],
        lec2: newRow['lec2'],
        lec3: newRow['lec3'],
        quiz_details: newRow['quiz_details']
      });
      console.log(data);
      await axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data);
          onReload()
          ButterToast.raise({
            content: <Cinnamon.Crisp title="Success!"
              content="Update Successful!"
              scheme={Cinnamon.Crisp.SCHEME_GREEN}
              icon={<CheckCircleOutlineIcon />}
            />
          })
        });
    }
  };

  const onDelete = (id) => {
    const url = "http://localhost:8004/Course/";
    axios.delete(url + id).then((res) => {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Success!"
          content="Delete Successful!"
          scheme={Cinnamon.Crisp.SCHEME_GREEN}
          icon={<CheckCircleOutlineIcon />}
        />
      });
      onReload();
    });
  }

  const VideoColumn = ({ videoUrl }) => (
    <div style={{ width: '250px', height: '150px' }}>
      <video controls style={{ width: '100%', height: '100%' }}>
        <source src={"http://localhost:8004/" + videoUrl} type="video/mp4" />
      </video>
    </div>
  );

  const columns = [
    { title: "Name", field: "name"},
    { title: 'Lecture 1', field: 'lec1' },
    { title: 'Lecture 2', field: 'lec2' },
    { title: 'Lecture 3', field: 'lec3' },
    { title: 'Quiz Details', field: 'quiz_details' },
    { title: 'Price', field: 'price' },
    {
      title: 'Lecture Video',
      field: 'video_link',
      editable: 'never',
      render: rowData => <VideoColumn videoUrl={rowData.video_link} />,
    },
  ]
  return (
    <div>
      <Typography gutterBottom variant="h3" align="center">
        Course Details
      </Typography>
      <Card style={{ maxWidth: 80 + '%', padding: "20px 20px", margin: "0 auto" }}>
        <br />
        <MaterialTable title="Course Table" columns={columns} data={courseData} style={{ maxWidth: 100 + '%', padding: "20px 5px", margin: "0 auto" }}
          options={{
            filtering: true,
            sorting: true,
            actionsColumnIndex: -1
          }
          }
          editable={{
            onRowUpdate: (newRow, oldRow) => new Promise(async (resolve, reject) => {
              Form_Sub_Fun(newRow, oldRow)
              setTimeout(() => resolve(), 300)
            }),
            onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
              console.log(selectedRow)
              onDelete(selectedRow._id)
              setTimeout(() => resolve(), 300)
            })
          }} />
      </Card>
      <br />
    </div>
  );

}

export default AllCourse;

