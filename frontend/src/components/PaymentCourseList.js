import React, { useState, useEffect } from "react"
import "../App.css"
import { Grid, Card, CardContent, Typography } from '@material-ui/core'
import { useHistory } from "react-router-dom"
import axios from "axios"
import md5 from 'md5'

function PaymentCourseList() {

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
            .then((response) => {
                console.log(response["data"])
                setCourseData(response["data"])
            });
    }

    const payment = async (id, name, o_amount) => {
        console.log(id)

        const calculateHash = (merchant_id, order_id, amount, currency, merchant_secret) => {
            const formattedAmount = parseFloat(amount).toFixed(2); // Format amount to two decimal places
            const hashInput = merchant_id + order_id + formattedAmount + currency + md5(merchant_secret).toString().toUpperCase();
            const hash = md5(hashInput).toString().toUpperCase();
            return hash;
        };

        // Example usage
        const merchant_id = "1226568";
        const order_id = id;
        const amount = o_amount
        const currency = "LKR";
        const merchant_secret = "MTQ2MjU4MDM3MzcxOTI2NTEwNzA5NzkxMTcwNzM3OTY1MTIy";

        const hash = calculateHash(merchant_id, order_id, amount, currency, merchant_secret).toUpperCase();
        console.log(hash);

        var payment = {
            sandbox: true,
            merchant_id: '1226568',
            return_url: 'http://localhost:3000/paymentCourseList',
            cancel_url: 'http://localhost:3000/paymentCourseList',
            notify_url: 'http://localhost:3000/paymentCourseList',
            order_id: id,
            items: id,
            amount: o_amount,
            currency: 'LKR',
            first_name: 'k',
            last_name: 'u',
            email: 'codeflex.it@gmail.com',
            phone: '0712129185',
            address: 'No.103',
            city: 'Colombo',
            country: 'Sri Lanka',
            delivery_address: 'No.103',
            delivery_city: 'Colombo',
            delivery_country: 'Sri Lanka',
            custom_1: '',
            custom_2: '',
            hash: hash
        };

        window.payhere.onCompleted = function onCompleted(orderId) {
            console.log("Payment completed. OrderID:" + orderId);
        };

        window.payhere.onDismissed = function onDismissed() {
            console.log("Payment dismissed");
        };

        window.payhere.onError = function onError(error) {
            console.log("Error:" + error);
        };

        window.payhere.startPayment(payment);
    }

    return (
        <div className="App">
            <br />
            <Typography gutterBottom variant="h3" align="center">
                All Course
            </Typography>
            <Grid>
                <Card style={{ maxWidth: 85 + '%', padding: "5px 5px", margin: "0 auto" }}>
                    <CardContent>
                        <br />
                        <hr />
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {
                                courseData.map((res) =>
                                    <Grid item xs={3} sm={6} md={6} >
                                        <div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">Course Name : {res.name}</h5>
                                                <h5 class="card-title">Course Price : {res.price}</h5>
                                                <button onClick={() => payment(res._id)} class="btn btn-secondary">Click To Pay</button>
                                            </div>
                                        </div>
                                    </Grid>)
                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <br />
        </div>
    );
}

export default PaymentCourseList;