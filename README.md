# DS-Edu-Pal

## 📍 Introduction
Our platform 'EduPal', akin to Coursera and Udemy, aims to democratize education by offering diverse courses for learners of all backgrounds. With a user-friendly interface, users can seamlessly browse, enroll, and access courses. The Course Management Service empowers instructors to curate content, while ensuring quality and facilitating transactions. Leveraging Microservices, Docker, Kubernetes, and the MERN Stack, we prioritize scalability and security. Our asynchronous web client, powered by React.js, fosters dynamic engagement. User authentication is paramount across learner, instructor, and administrator roles. We're dedicated to excellence, innovation, and accessibility, redefining online learning worldwide.

## 📍 Functional Requirements

#### 1. Web Interface 💻
Where learners can browse, enroll in, and access courses ensuring user-friendly interfaces and support for various devices. 

#### 2. Course Management Service 📚
Service where course instructors can add, update, and delete course information. Instructors should be able to manage course content and enrollment details.

  • Instructor role 👩🏻‍💻 - Add, update, and delete course content (lecture notes, videos, quizzes), monitor learner progress.
  
  • Admin role 👩🏻‍💻 – Approve course content and user registration integrate payment gateways, handlefinancial transactions related to course enrollments.

#### 3. Learner Service with Multiple Course Enrollment 📚🗝️
Service where learners can enroll in courses and track their progress. Allow learners to cancel course enrollment if needed.
Learners are able to enroll in multiple courses simultaneously without scheduling conflicts

#### 4. Payment Integration 💳
Payment integration to facilitate course enrollment payments. For this used 'Chapa' (https://chapa.co/).

#### 5. Confirmation and Notification 💬📧
Upon successful registration, account removing and enrollment, learners should receive confirmation via SMS and email.
For Email sending used NodeMailer.


## 📍 Deployment
1. Ensure that Node.js, MongoDB, GitHub Desktop App, Docker Destop App (enable Kubernetes inside Docker Desktop) are installed on your system.
2. Clone the repository.
3. Open `backend' and 'frontend' folders two seperate windows in VisualStudio Code.
4. In backend folder navigate to the four directories which named as 'Course', 'Enroll', 'Learner' and 'User' in four seperate terminals. Then in each terminal provide with the below command:
   `nodemon`
5. Inside every service folder ('Course', 'Enroll', 'Learner' and 'User') there is a file named as `db.js`. Change the mongoDB url in there to your 'url'.
6. In frontend folder, navigate into the 'frontend' directory in the terminal.
7. Install dependencies by running the command:
   `npm i --legacy-peer-deps`
8. Start the frontend by running the command:
  `npm start`
9. Before runnin to the docker commands ensure inside the `Dockerfile` the node version is similar to your currrent node version.
10. Once again in backend folder navigate to the four directories which named as 'Course', 'Enroll', 'Learner' and 'User' in four seperate terminals.
    Provide below commands to create the docker image for each service.
    
    `docker build -t kube/user_api_service .`
    
    `docker build -t kube/learner_api_service .`
    
    `docker build -t kube/enroll_api_service .`
    
    `docker build -t kube/course_api_service .`
12. In backend folder, navigate into the 'backend' directory in the terminal.
    Provide below commands.
    
    `kubectl create -f kube.yml`


## Note
Refer to the API documentations (generated using Postman) for detailed information on available endpoints and their usage.
