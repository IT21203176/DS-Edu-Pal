import React, { useState , useEffect } from "react"
import "../App.css"
import { Grid , Card, CardContent, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom"
import axios from "axios"
import ButterToast, { Cinnamon } from "butter-toast"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

function CourseList() {

  const [courseData, setCourseData] = useState([]);
  let history = useHistory();
  
  useEffect(async() => {
    onReload()
    if(localStorage.getItem('user_session')){
      
    }else{
      history.push("/login")
    }
  }, []);

  const onReload = () => {
    const url = "http://localhost:8004/Course";
    axios
      .get(url)
      .then((response) => {
        console.log(response["data"])
        setCourseData(response["data"])
      });
  }

  const enroll = async(id) => {
    localStorage.getItem("id")
    const url = "http://localhost:8003/Enroll";
    const data = JSON.stringify({
      course_id: id,
      user_id: localStorage.getItem("id")
    });
    console.log(data);
    await axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(async(res) => {
        console.log(res.data.data);
        if(res.data.data==="success"){
          ButterToast.raise({
            content: <Cinnamon.Crisp title="Success!"
              content="Successful!"
              scheme={Cinnamon.Crisp.SCHEME_GREEN}
              icon={<CheckCircleOutlineIcon />}
            />
          })
        }else{
          ButterToast.raise({
            content: <Cinnamon.Crisp title="Connection Error!"
              content="already enroll!"
              scheme={Cinnamon.Crisp.SCHEME_RED}
              icon={<ErrorOutlineIcon />}
            />
          })
        }
      });
  }

  return (
    <div className="App">
      <br/>
      <Typography gutterBottom variant="h3" align="center">
        All Course
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 85+'%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <br />
              <hr/>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {
                    courseData.map((res) =>
                    <Grid item xs={3} sm={6} md={6} >
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Course Name : { res.name }</h5>
                                <h5 class="card-title">Course Price : { res.price }</h5>
                                <button onClick={()=>enroll(res._id) } class="btn btn-secondary">Click To Enroll</button>
                            </div>
                        </div>
                    </Grid>)
                  }
              </Grid>
          </CardContent>
        </Card>
      </Grid>
      <br/>
    </div>
  );
}

export default CourseList;