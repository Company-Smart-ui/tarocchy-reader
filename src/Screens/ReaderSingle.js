import "../Styles/Styles.css";
import { useEffect, useState } from "react";
import { events, responses } from "../ServerCommunication";
import globalThis from "../Global";
import StarRatings from "react-star-ratings";

import Twitter from "../Images/twitter.svg";
import Facebook from "../Images/facebook.svg";
import Instagram from "../Images/instagram.svg";
import Email from "../Images/email.svg";
import Return from "../Images/return.svg";

import Login from "../Components/Login";

export default function ReaderSingle(data) {
    const [agentDetails, setAgentDetails] = useState(data.agentDetails);
    const [imageSrc, setImageSrc] = useState(data.imageSrc);
    const [stars, setStars] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [reviews, setReviews] = useState([]);
    const setAgent = data.setAgent;
    // const data = useLocation();
    //  const agentDetails = data.state.agentDetails;
    //  const agentImage = data.state.agentImage;
    //  console.log(agentDetails);
    //  console.log(agentImage);

    useEffect(() => {
        globalThis.events.addEventListener(events.postReviewResponse, postReviewResponse);
        globalThis.events.addEventListener(events.getReviewsResponse, getReviewsResponse);
        //globalThis.events.addEventListener(events.downloadAgentProfilePictureRequest, downloadAgentProfilePictureRequest);
        // globalThis.events.addEventListener(events.agentDetailsResponse, agentDetailsResponse);
        //globalThis.events.addEventListener(events.requestData, requestData);

        return function cleanup() {
            globalThis.events.removeEventListener(events.postReviewResponse);
            globalThis.events.removeEventListener(events.getReviewsResponse);
            // globalThis.events.removeEventListener(events.downloadAgentProfilePictureRequest);
            // globalThis.events.removeEventListener(events.agentDetailsResponse);
            // globalThis.events.removeEventListener(events.requestData);
        };
    }, []);

    useEffect(() => {
        var starElements = document.getElementsByClassName("star-ratings")[0].children;
        for (var i = 1; i < starElements.length; i++) {
            starElements[i].style.cursor = "pointer";
            starElements[i].addEventListener("click", setStar.bind(this, i));
        }
        getReviewsRequest();
    }, []);

    function setStar(rating) {
        setStars(rating);
    }

    function postReviewResponse(data) {
        switch (data.response) {
            case responses.loginRequired:
                // toast.warn("You need to login in order to leave a review!");
                setShowPopup(true);
                break;
            case responses.success:
                getReviewsRequest();
                break;
            default:
                break;
        }
    }

    function getReviewsRequest() {
        globalThis.socket.send(
            JSON.stringify({
                event: events.getReviewsRequest,
                agentPIN: agentDetails.agentPIN,
            })
        );
    }

    function getReviewsResponse(data) {
        setReviews(data.reviews);
    }

    function postReviewRequest() {
        globalThis.socket.send(
            JSON.stringify({
                event: events.postReviewRequest,
                agentPIN: agentDetails.agentPIN,
                title: title,
                content: content,
                stars: stars,
            })
        );
    }

    /*function requestData() {
        //agentDetailsRequest();
        downloadAgentProfilePictureRequest();
    }

    function downloadAgentProfilePictureRequest() {
        //console.log("requested pin  " + PIN);
        globalThis.socket.send(
            JSON.stringify({
                event: events.downloadAgentProfilePictureRequest,
                agentPIN: agentDetails.agentPIN,
            })
        );
        console.log(agentDetails.agentPIN);
    }

    function downloadAgentProfilePictureResponse(data) {
        //console.log("image got: " + PIN);
        //console.log(data.imageBase64);
        // console.log(data);
        //console.log(agentPIN);
        //  console.log(imageBase64)
        if (data.agentPIN === agentDetails.agentPIN) {
            setImageSrc(data.imageBase64);
            //image.current.src = data.imageBase64;
            //setTriggerRender(!triggerRender);
        }
    }*/

    /* function agentDetailsResponse(data) {
        console.log(data);
        // if (data.agentPIN === PIN) {
        setAgentDetails({
            agentName: data.username,
            bio: data.bio,
            whatisrequired: data.whatisrequired,
            whattoexpect: data.whattoexpect,
            specialties: data.specialties,
            languages: data.languages,
        });
        //  }
    }*/

    function agentDetailsRequest() {
        /*  globalThis.socket.send(
            JSON.stringify({
                event: events.agentDetailsRequest,
                agentPIN: PIN,
            })
        );*/
    }

    function setSelectedAgent() {
        setAgent(null);
    }

    function logout() {
        globalThis.socket.close();
        globalThis.isLoggedIn = false;
    }

    return (
        <div className="App">
            {agentDetails && (
                <div>
                    {showPopup && <Login showPopup={setShowPopup} />}
                    <div className="back-container">
                        <img src={Return} className="back-to-readers" onClick={setSelectedAgent}></img>
                        <div className="login-logout" onClick={!globalThis.isLoggedIn ? setShowPopup : logout}>
                            {!globalThis.isLoggedIn ? "Login" : "Logout"}
                        </div>
                    </div>
                    <div className="single-reader-container">
                        <div className="single-reader-flex-left">
                            <img src={imageSrc} className="single-reader-image"></img>
                            <div className="social-media-container">
                                <a href="https://www.facebook.com/Tarocchy-106368828679442/">
                                    <img src={Facebook} className="social-media-icon"></img>
                                </a>
                                <a href="https://www.instagram.com/tarocchy/">
                                    <img src={Instagram} className="social-media-icon"></img>
                                </a>
                                <a href="https://twitter.com/tarocchy">
                                    <img src={Twitter} className="social-media-icon"></img>
                                </a>
                                <a href="mailto:admin@tarocchy.com">
                                    <img src={Email} className="social-media-icon"></img>
                                </a>
                            </div>
                        </div>
                        <div className="single-reader-flex-right">
                            <p className="single-reader-title">{agentDetails.agentName}</p>
                            <div>
                                <p>
                                    <strong>Specialties: </strong>
                                    {agentDetails.specialties}
                                </p>
                                <p>
                                    <strong>Languages: </strong>
                                    {agentDetails.languages}
                                </p>
                            </div>
                            <p className="single-reader-secondary-title">BIO</p>
                            <hr></hr>
                            <p>{agentDetails.bio}</p>
                            <p className="single-reader-secondary-title">WHAT IS REQUIRED</p>
                            <hr></hr>
                            <p>{agentDetails.whatisrequired}</p>
                            <p className="single-reader-secondary-title">WHAT TO EXPECT</p>
                            <hr></hr>
                            <p>{agentDetails.whattoexpect}</p>
                        </div>
                    </div>
                    <div className="single-reader-bottom">
                        <div className="single-reader-reviews">
                            <div className="bottom-header">Reviews</div>
                            <div className="review-container">
                                {reviews
                                    .slice(0)
                                    .reverse()
                                    .map((review) => {
                                        return (
                                            <div className="review">
                                                <div className="name-rating">
                                                    <div className="review-name">{review.username}</div>
                                                    <StarRatings
                                                        rating={review.stars}
                                                        starRatedColor="orange"
                                                        numberOfStars={5}
                                                        name="rating"
                                                        starDimension="2.5vmin"
                                                        starSpacing="0vmin"
                                                    />
                                                </div>
                                                <div className="review-title">{review.title === "" ? "No title" : review.title}</div>
                                                <div className="review-content">{review.content}</div>
                                                <hr className="review-hr"></hr>
                                            </div>
                                        );
                                    })}
                                {reviews.length === 0 && <div className="no-reviews">No reviews yet!</div>}
                            </div>
                        </div>
                        <div className="single-reader-bottom-container">
                            <div className="bottom-header">Reader rating</div>
                            <StarRatings rating={stars} starRatedColor="orange" numberOfStars={5} name="rating" starDimension="2.5vmin" starSpacing="0vmin" />
                            <div className="bottom-header">Title of your review</div>
                            <input
                                type="text"
                                placeholder="Summarize your review or higlight an interesting detail"
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                            <div className="bottom-header">Your review</div>
                            <textarea rows="5" placeholder="Tell people your review" onChange={(e) => setContent(e.target.value)}></textarea>
                            <button onClick={postReviewRequest} className="submit">
                                Submit your review
                            </button>
                        </div>
                    </div>
                    <div className="back-container">
                        <img style={{ margin: 0 }} src={Return} className="back-to-readers" onClick={setSelectedAgent}></img>
                    </div>
                </div>
            )}
        </div>
    );
}
