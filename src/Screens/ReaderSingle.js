
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

    const [field, setPosts] = useState([]);
    useEffect(() => {
       fetch('https://tarocchy.com/wp-json/wp/v2/react-settings?_fields=acf&per_page=1')
       .then((field)=>{
            return field.json();
        }
        )
        .then((resp)=>{
            setPosts(resp)
        })
    }, []);

    const video = field.map((post) => (`${post.acf['link_on_video']}` ));
    const [start, setStart] = useState(false);

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
                                    <img src={Facebook} alt={"Facebook"} className="social-media-icon"></img>
                                </a>
                                <a href="https://www.instagram.com/tarocchy/">
                                    <img alt={"Instagram"} src={Instagram} className="social-media-icon"></img>
                                </a>
                                <a href="https://twitter.com/tarocchy">
                                    <img alt={"Twitter"} src={Twitter} className="social-media-icon"></img>
                                </a>
                                <a href="mailto:admin@tarocchy.com">
                                    <img src={Email} alt={ "Email"}   className="social-media-icon"></img>
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
                            <p className="single-reader-secondary-title">REVIEWS</p>
                            <hr></hr>
                            <div className="single-reader-bottom">
                                {reviews
                                    .slice(0)
                                    .reverse()
                                    .map((review , i) => {
                                        return (
                                            <div key={i} className="review">
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
                            <p className="single-reader-secondary-title">VIDEO</p>
                            <hr></hr>
                            <div className="video-wrap">
                                {
                                    !start?<>
                                        <button onClick={() => {
                                            setStart(true)
                                        }} className="video-play">
                                            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                                                <path className="ytp-large-play-button-bg"
                                                    d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                                                    fill="#f00"></path>
                                                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                                            </svg>
                                        </button>
                                        <img src={"https://i.ytimg.com/vi/"+video+"/hqdefault.jpg"} alt={"youtoobe"}/>
                                    </>:
                                    <iframe
                                    src={"https://www.youtube.com/embed/"+video+"?autoplay=1&mute=1"}
                                    title="YouTube video player" frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen/>
                                }
                            </div>
                            <p>{field.map((post) => (` ${post.acf['text']}` ))}</p>
                            <p className="single-reader-secondary-title">READER RATING</p>
                            <hr></hr>
                            <div className="single-reader-bottom-container">
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
                    </div>
                    
                    <div className="back-container">
                        <img style={{ margin: 0 }} src={Return} className="back-to-readers" onClick={setSelectedAgent}></img>
                    </div>
                </div>
            )}
        </div>
    );
}
