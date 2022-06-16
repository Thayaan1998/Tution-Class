import React, { useState, useEffect } from "react";
import Rating from '@mui/material/Rating';
import { Card } from 'react-bootstrap';
import axios from "axios";
import Box from '@mui/material/Box';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import Grid from '@mui/material/Grid';
import Navigation2 from "../navigations/Navigation2"
import Navigation3 from "../navigations/Navigation3"


import Input from '../controls/Input'

const Reviews = () => {

    const [Comments, SetComments] = useState([]);
    const [rating, setRatings] = React.useState(0);
    const [commentId, setCommentId] = React.useState(0);
    const [repliesCount, setrepliesCount] = React.useState(0);


    const [Replies, SetReplies] = useState([]);
    const [errors, setErrors] = useState({});
    const [replieserrors, repliessetErrors] = useState({});



    const [input, setInput] = useState({
        name: "",
        email: "",
        review: ""
    });

    const [repliesinput, setrepliesInput] = useState({
        repliesinputname: "",
        repliesinputemail: "",
        repliesinputreply: ""
    });

    const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('name' in fieldValues)
            temp.sendername = fieldValues.sendername ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This field is required."
        if ('review' in fieldValues)
            temp.review = fieldValues.review ? "" : "This field is required."


        setErrors({
            ...temp
        })
        if (fieldValues == input)
            return Object.values(temp).every(x => x == "")


    }

    const validate2 = (fieldValues = repliesinput) => {
        let temp = { ...replieserrors }

        if ('repliesinputname' in fieldValues)
            temp.repliesinputname = fieldValues.repliesinputname ? "" : "This field is required."
        if ('repliesinputemail' in fieldValues)
            temp.repliesinputemail = fieldValues.repliesinputemail ? "" : "This field is required."
        if ('repliesinputreply' in fieldValues)
            temp.repliesinputreply = fieldValues.repliesinputreply ? "" : "This field is required."


        repliessetErrors({
            ...temp
        })
        if (fieldValues == repliesinput)
            return Object.values(temp).every(x => x == "")


    }

    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
        validate({ [name]: value })

    }

    const handleInputChange2 = (e) => {

        let { name, value } = e.target;
        setrepliesInput({ ...input, [name]: value })
        validate2({ [name]: value })

    }


    const submitComment = async () => {
        var variables = {
            'commentsId ': 0,
            'name': input.name,
            'email': input.email,
            'review': input.review,
            'rating': rating,
            'likes': 0,
            'dislikes': 0,
            'replies': 0
        };

        console.log(variables)
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await axios.post("http://localhost:9000/comments/postComment", variables, { headers });
            console.log(response)
            loadComments();

            //  loadComments();



        } catch (error) {
            console.log(error);
        }


    }
    const submitReply = async () => {
        var variables = {

            'name': document.getElementById("repliesinputname").value,
            'email': document.getElementById("repliesinputemail").value,
            'reply': repliesinput.repliesinputreply,
            'commentId': commentId,
            'replyId': 0
        };

        console.log(variables)


        let increaserepliesCount = repliesCount + 1;
        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            const response = await axios.post("http://localhost:9000/comments/postReplies/" + increaserepliesCount, variables, { headers });
            console.log(response)
            loadComments();
            try {
                var response2 = await axios.get("http://localhost:9000/comments/getReplies/" + commentId);
                console.log(response2.data);
                //  await loadComments();
                SetReplies(response2.data)

            } catch (error) {

            }




        } catch (error) {
            console.log(error);
        }


    }

    const loadComments = async () => {
        try {

            var response = await axios.get("http://localhost:9000/comments/allComments");



            var response1 = await axios.get("http://localhost:9000/comments/getLikedComments/2");



            for (var j = 0; j < response.data.length; j++) {


                for (var i = 0; i < response1.data.length; i++) {

                    if (response1.data[i].commentId == response.data[j].commentsId) {

                        response.data[j]["liked"] = "yes";
                        response.data[j]["likedId"] = response1.data[i].likedId;

                    } else {
                        // console.log(response1.data[i].commentId)
                        // console.log( response.data[j].commentId)
                        if (response.data[j]["liked"] != "yes") {
                            response.data[j]["liked"] = "no";
                            response.data[j]["likedId"] = 0;

                        }

                    }
                }
            }
            var response2 = await axios.get("http://localhost:9000/comments/getDisLikedComments/2");

            for (let j = 0; j < response.data.length; j++) {

                for (let i = 0; i < response2.data.length; i++) {

                    if (response2.data[i].commentId == response.data[j].commentsId) {
                        response.data[j]["disliked"] = "yes";
                        response.data[j]["dislikedId"] = response2.data[i].dislikedId;
                    } else {
                        if (response.data[j]["disliked"] != "yes") {
                            response.data[j]["disliked"] = "no";
                            response.data[j]["dislikedId"] = 0;
                        }

                    }
                }
            }

            for (let j = 0; j < response.data.length; j++) {
                if (response.data[j]["disliked"] != "yes") {
                    response.data[j]["disliked"] = "no";
                    response.data[j]["dislikedId"] = 0;
                }
                if (response.data[j]["liked"] != "yes") {
                    response.data[j]["liked"] = "no";
                    response.data[j]["likedId"] = 0;
                }

            }

            console.log(response.data);



            SetComments(response.data)


        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadComments();
    }, []);

    const likeOnClick = async (likes, commentId, liked, likedId, disliked, dislikes, dislikedId) => {
        if (liked == "no") {
            if (disliked == "no") {
                likes = likes + 1;
                try {

                    var response = await axios.get("http://localhost:9000/comments/updateLikedComment/"
                        + likes + "," + commentId + "," + 2 + "," + "save" + "," + likedId);
                    console.log(response);
                    await loadComments();

                } catch (error) {

                }

            } else {


                try {
                    dislikes = dislikes - 1;
                    var response = await axios.get("http://localhost:9000/comments/updateDisLikedComment/"
                        + dislikes + "," + commentId + "," + 2 + "," + "notsave" + "," + dislikedId);
                    likes = likes + 1;
                    var response2 = await axios.get("http://localhost:9000/comments/updateLikedComment/"
                        + likes + "," + commentId + "," + 2 + "," + "save" + "," + likedId);
                    await loadComments();

                } catch (error) {

                }

            }


        } else {
            likes = likes - 1;

            try {
                var response = await axios.get("http://localhost:9000/comments/updateLikedComment/"
                    + likes + "," + commentId + "," + 2 + "," + "notsave" + "," + likedId);
                console.log(response);
                await loadComments();

            } catch (error) {

            }
        }
        // console.log(likes);
    }

    const dislikeOnClick = async (dislikes, commentId, disliked, dislikedId, liked, likes, likedId) => {
        if (disliked == "no") {
            if (liked == "yes") {
                try {
                    likes = likes - 1;
                    var response = await axios.get("http://localhost:9000/comments/updateLikedComment/"
                        + likes + "," + commentId + "," + 2 + "," + "notsave" + "," + likedId);
                    dislikes = dislikes + 1;
                    var response2 = await axios.get("http://localhost:9000/comments/updateDisLikedComment/"
                        + dislikes + "," + commentId + "," + 2 + "," + "save" + "," + dislikedId);
                    console.log(response);
                    await loadComments();

                } catch (error) {

                }
            } else {
                dislikes = dislikes + 1;
                try {

                    var response = await axios.get("http://localhost:9000/comments/updateDisLikedComment/"
                        + dislikes + "," + commentId + "," + 2 + "," + "save" + "," + dislikedId);
                    console.log(response);
                    await loadComments();

                } catch (error) {

                }
            }

        } else {
            dislikes = dislikes - 1;

            try {
                var response = await axios.get("http://localhost:9000/comments/updateDisLikedComment/"
                    + dislikes + "," + commentId + "," + 2 + "," + "notsave" + "," + dislikedId);
                console.log(response);
                await loadComments();

            } catch (error) {

            }
        }
    }

    const replyOnClick = async (commentId, repliesCount) => {
        console.log(commentId);
        setCommentId(commentId);
        setrepliesCount(repliesCount)

        try {
            var response = await axios.get("http://localhost:9000/comments/getReplies/" + commentId);
            console.log(response.data);
            //  await loadComments();
            SetReplies(response.data)

        } catch (error) {

        }
    }



    return (
        <div>
            {localStorage.getItem("userType") === "serviceConsumer" ? (

              <Navigation2></Navigation2>
            ) : (

                <Navigation3></Navigation3>

            )}
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Input
                        id="name"
                        value={input.name}
                        handleInputChange={handleInputChange}
                        placeholder="Enter Name......"
                        errors={errors.name}
                    />
                    <Input
                        id="email"
                        value={input.email}
                        handleInputChange={handleInputChange}
                        placeholder="Enter Email......"
                        errors={errors.email}
                    />
                    <Input
                        id="review"
                        value={input.review}
                        handleInputChange={handleInputChange}
                        placeholder="Enter Review......"
                        errors={errors.review}
                    />
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: "20px"
                        }}
                    >
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            size="large"
                            onChange={(event, newValue) => {
                                setRatings(newValue);
                            }}
                        />

                        {/* Use rating value */}
                        {rating}
                    </Box>
                    <button class="btn btn-primary" style={{ margin: '30px' }} onClick={submitComment}>Submit</button>
                    {
                        Comments.map((row) => {

                            return (

                                <Card style={{ width: '18rem', margin: '20px' }}>

                                    <Card.Body>
                                        <Card.Text>
                                            <b>{row.name}</b>
                                        </Card.Text>
                                        <Rating name="read-only" value={row.rating} readOnly />
                                        <Card.Text>
                                            {row.review}
                                        </Card.Text>



                                        <Box
                                            sx={{
                                                width: 200,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <ThumbUpIcon

                                                style={{

                                                    color: row.liked == "yes" ? 'blue' : 'black'
                                                }}
                                                onClick={() => likeOnClick(row.likes, row.commentsId, row.liked, row.likedId, row.disliked, row.dislikes, row.dislikedId)
                                                }

                                            />

                                            {row.likes}
                                            <ThumbDownIcon

                                                style={{

                                                    color: row.disliked == "yes" ? 'blue' : 'black',
                                                    marginLeft: "20px"
                                                }}
                                                onClick={() => dislikeOnClick(row.dislikes, row.commentsId, row.disliked, row.dislikedId, row.liked, row.likes, row.likedId)
                                                }


                                            />

                                            {row.dislikes}

                                            <CommentIcon

                                                style={{


                                                    marginLeft: "20px"
                                                }}
                                                onClick={() => replyOnClick(row.commentsId, row.replies)}


                                            />

                                            {row.replies}

                                        </Box>

                                    </Card.Body>
                                </Card>


                            )
                        })
                    }

                </Grid>
                <Grid item xs={6}>
                    <Input
                        id="repliesinputname"
                        value={repliesinput.repliesinputname}
                        handleInputChange={handleInputChange2}
                        placeholder="Enter Name......"
                        errors={errors.repliesinputname}
                    />
                    <Input
                        id="repliesinputemail"
                        value={repliesinput.repliesinputemail}
                        handleInputChange={handleInputChange2}
                        placeholder="Enter Email......"
                        errors={errors.repliesinputemail}
                    />
                    <Input
                        id="repliesinputreply"
                        value={repliesinput.repliesinputreply}
                        handleInputChange={handleInputChange2}
                        placeholder="Enter Reply......"
                        errors={errors.repliesinputreply}
                    />
                    <button class="btn btn-primary" style={{ margin: '30px' }}
                        onClick={submitReply}>Submit</button>

                    {

                        Replies.map((row) => {
                            return (
                                <Card style={{ width: '18rem', margin: '20px' }}>
                                    <Card.Text>
                                        {row.name}
                                    </Card.Text>
                                    <Card.Text>
                                        <b>{row.reply}</b>
                                    </Card.Text>
                                </Card>
                            )
                        })

                    }
                </Grid>
            </Grid>
        </div>
    );
}
export default Reviews;
