import React, { useState , useEffect } from "react"
import "../App.css"
import axios from "axios"
import { Grid, TextField, Button, Card, CardContent, Typography, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import ButterToast, { Cinnamon } from "butter-toast"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { useHistory } from "react-router-dom"

function Course() {

  const [video_link, setVideo_link] = useState('');
  const [name, setName] = useState('');
  const [lec1, setLec1] = useState('');
  const [lec2, setLec2] = useState('');
  const [lec3 , setLec3 ] = useState('');
  const [price , setPrice] = useState('');
  const [quiz_details , setQuiz_details] = useState('');
  const inputRef = React.useRef();
  let history = useHistory();

  useEffect(async() => {
    if(localStorage.getItem('user_session')){
      
    }else{
      history.push("/login")
    }
  }, []);

  const setNameForm = (e) => {
    setName(e.target.value)
  }

  const setQuiz_detailsForm = (e) => {
    setQuiz_details(e.target.value)
  }

  const setPriceForm = (e) => {
    setPrice(e.target.value)
  }

  const setVideo_linkForm = (e) => {
    var selectedFile=e.target.files[0]
    const data = new FormData() 
    data.append('file', selectedFile)
    axios.post("http://localhost:8004/Course/upload", data, { 
    }).then(res => { 
        console.log(res.data.filename)
        setVideo_link (res.data.filename)
    })
  }

  const setLec1Form = (e) => {
    setLec1(e.target.value)
  }

  const setLec2Form = (e) => {
    setLec2(e.target.value)
  }

  const setLec3Form = (e) => {
    setLec3(e.target.value)
  }
  
  const onClear = () => {
    setQuiz_details('')
    setPrice('')
    setVideo_link('')
    setLec1('')
    setLec2('')
    setLec3 ('')
  }

  const validation = () => {
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
    
    if (video_link === "") {
      ButterToast.raise({
        content: <Cinnamon.Crisp title="Validation Error!"
          content="Video_link Required!"
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
    
    if (lec3  === "") {
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
  };

  const Form_Sub_Fun = async (e) => {
    e.preventDefault();

    if (validation()) {

      const url = "http://localhost:8004/Course";
      const data = JSON.stringify({
        name: name,
        video_link: video_link,
        price: price,
        lec1: lec1,
        lec2: lec2,
        lec3 : lec3,
        quiz_details:quiz_details
      });
      console.log(data);
      await axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(async(res) => {
          console.log(res.data.data);
          if(res.data.data==="success"){
            onClear()
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
                content="Unsuccessful!"
                scheme={Cinnamon.Crisp.SCHEME_RED}
                icon={<ErrorOutlineIcon />}
              />
            })
          }
        });
    }
  };

  return (
    <div className="App">
      <br/>
      <Typography gutterBottom variant="h3" align="center">
        Add New Course
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 50+'%', padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Course Details
            </Typography>
            <br />
            <form autoComplete="off" onSubmit={Form_Sub_Fun}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField type="text"
                    placeholder="Course Name"
                    label="Course Name"
                    variant="standard"
                    name="name"
                    value={name}
                    onChange={setNameForm}
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="text"
                    placeholder="Course Lecture 1"
                    label="Course Lecture 1"
                    variant="standard"
                    name="lec1"
                    minRows={3}
                    multiline
                    value={lec1}
                    onChange={setLec1Form}
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="text"
                    placeholder="Course Lecture 2"
                    label="Course Lecture 2"
                    variant="standard"
                    name="lec2"
                    minRows={3}
                    multiline
                    value={lec2}
                    onChange={setLec2Form}
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="text"
                    placeholder="Course Lecture 3"
                    label="Course Lecture 3"
                    variant="standard"
                    name="lec3"
                    minRows={3}
                    multiline
                    value={lec3}
                    onChange={setLec3Form}
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="number"
                    placeholder="Course Fee"
                    label="Course Fee"
                    inputProps={{ min: 1 }}
                    variant="standard"
                    name="price"
                    value={price}
                    onChange={setPriceForm}
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="text"
                    placeholder="Quiz Details"
                    label="Quiz Details"
                    minRows={3}
                    multiline
                    variant="standard"
                    name="quiz_details"
                    value={quiz_details}
                    onChange={setQuiz_detailsForm}
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="file"
                    accept="image/*"
                    placeholder="Video"
                    label="Video"
                    variant="standard"
                    name="video_link"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      accept: 'video/*'
                    }}
                    onChange={setVideo_linkForm}
                    fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit"
                    variant="contained"
                    style={{ backgroundColor: '#2196f3', color: '#FFFFFF', width: '50%' }}>Submit</Button>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#ff5722', color: '#FFFFFF', width: '40%' }}
                    onClick={() => onClear()}
                  >Clear</Button>
                </Grid>

              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <br/>
    </div>
  );
}

export default Course;