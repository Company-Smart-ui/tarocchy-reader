import "../Styles/Styles.css";
import StarRatings from "react-star-ratings";
import { useRef, useEffect, useState } from "react";
import { events, userStatus } from "../ServerCommunication";
import globalThis from "../Global";

import ClipLoader from "react-spinners/ClipLoader";

var requested = false;

export default function Reader(data) {
    // let [triggerRender, setTriggerRender] = useState(false);
    const PIN = data.PIN;
    const status = data.status;
    const phoneStatus = data.phoneStatus;
    const setAgent = data.setAgent;
    const category = data.selectedCategory;
    const show = data.show;
    //console.log(online);
    //const navigate = useNavigate();
    let [imageSrc, setImageSrc] = useState("");
    let [agentDetails, setAgentDetails] = useState({ agentName: "Agent", agentRating: 1, agentShortText: "Test Test Test" });
    let [rating, setRating] = useState(0);
    //const image = useRef();
    // console.log(PIN)

    useEffect(() => {
        // console.log("downloadResuest");
        globalThis.events.addEventListener(events.agentDetailsResponse, agentDetailsResponse);
        globalThis.events.addEventListener(events.downloadAgentProfilePictureResponse, downloadAgentProfilePictureResponse);
        globalThis.events.addEventListener(events.downloadAgentProfilePictureRequest, downloadAgentProfilePictureRequest);
        globalThis.events.addEventListener(events.getAgentRatingResponse, getAgentRatingResponse);
        agentDetailsRequest();
    }, []);

    /*functionuseEffect(() => {
        setTimeout(() => {
            downloadAgentProfilePictureRequest();
        }, 0);
    }, []);*/

    function downloadAgentProfilePictureRequest() {
        globalThis.socket.send(
            JSON.stringify({
                event: events.downloadAgentProfilePictureRequest,
                agentPIN: PIN,
            })
        );
    }

    function downloadAgentProfilePictureResponse(data) {
        if (data.agentPIN === PIN) {
            setImageSrc(data.imageBase64);
        }
    }

    function agentDetailsResponse(data) {
        //console.log(data);
        if (data.agentPIN === PIN) {
            //console.log(PIN);
            setAgentDetails({
                agentName: data.username,
                agentPIN: data.agentPIN,
                bio: data.bio,
                specialties: data.specialties,
                whatisrequired: data.whatisrequired,
                whattoexpect: data.whattoexpect,
                username: data.username,
                email: data.email,
                categories: data.categories,
            });
            getAgentRatingRequest();
        }
    }

    function getAgentRatingRequest() {
        globalThis.socket.send(
            JSON.stringify({
                event: events.getAgentRatingRequest,
                agentPIN: PIN,
            })
        );
    }

    function getAgentRatingResponse(data) {
        if (data.agentPIN === PIN) {
            if (data.rating !== null) {
                setRating(JSON.parse(data.rating));
            }
            downloadAgentProfilePictureRequest();
        }
    }

    function agentDetailsRequest() {
        //console.log(PIN);
        // console.log("asd");
        globalThis.socket.send(
            JSON.stringify({
                event: events.agentDetailsRequest,
                agentPIN: PIN,
            })
        );
    }

    function selectReader() {
        if (imageSrc !== "") {
            setAgent({ agentDetails: agentDetails, agentImage: imageSrc });
        }
        //window.location.href = `/readers-page/?reader=${PIN}`;
        //navigate("/reader", { state: { agentDetails: agentDetails, agentImage: imageSrc, PIN: PIN } });
    }

    function openChat() {
        document.cookie = `pin=${PIN}`;
        window.location.href = `/chat?pin=${PIN}`;
    }
    function openCall() {
        window.location.href = `/chat?redirect=call&pin=${PIN}`;
    }
    return (
        <>
            {show ? (
                <div className="reader-container">
                    <div className="reader-content">
                        <p className="reader-name" onClick={selectReader}>
                            {agentDetails.agentName}
                        </p>
                        <p className="reader-desc">{agentDetails.bio}</p>
                        <div>
                            <StarRatings rating={rating} starRatedColor="orange" numberOfStars={5} name="rating" starDimension="2.5vmin" starSpacing="0vmin" />
                            <p className="reader-pin">PIN:{PIN}</p>
                        </div>
                    </div>
                    <div className="reader-image-content">
                        {imageSrc !== "" ? (
                            <img src={imageSrc} className="reader-image" onClick={selectReader}></img>
                        ) : (
                            <div className="loader-container">
                                <ClipLoader color={"#000000"} size={"3vmin"} />
                            </div>
                        )}
                        <div className="reader-button-container">
                            {status === userStatus.online && (
                                <button className="reader-button user-online" onClick={openChat}>
                                    CHAT NOW
                                </button>
                            )}
                            {status === userStatus.offline && (
                                <button className="reader-button user-offline" onClick={openChat}>
                                    OFFLINE
                                </button>
                            )}
                            {status === userStatus.busy && (
                                <button className="reader-button user-busy" onClick={openChat}>
                                    BUSY
                                </button>
                            )}
                            {status === userStatus.away && (
                                <button className="reader-button user-away" onClick={openChat}>
                                    AWAY
                                </button>
                            )}
                            {phoneStatus === userStatus.online && (
                                <button className="reader-button user-online" onClick={openCall}>
                                    CALL NOW
                                </button>
                            )}
                            {phoneStatus === userStatus.offline && (
                                <button className="reader-button user-offline" onClick={openCall}>
                                    OFFLINE
                                </button>
                            )}
                            {phoneStatus === userStatus.busy && (
                                <button className="reader-button user-busy" onClick={openCall}>
                                    BUSY
                                </button>
                            )}
                            {phoneStatus === userStatus.away && (
                                <button className="reader-button user-away" onClick={openCall}>
                                    AWAY
                                </button>
                            )}
                            {phoneStatus === null && (
                                <button className="reader-button user-offline" onClick={openCall}>
                                    OFFLINE
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
