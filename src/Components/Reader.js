
import StarRatings from "react-star-ratings";
import { useRef, useEffect, useState } from "react";
import { events, userStatus } from "../ServerCommunication";
import globalThis from "../Global";

import ClipLoader from "react-spinners/ClipLoader";
import {Buttons} from "./buttons/buttons";

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
        if (data.agentPIN === PIN) {
            //console.log(PIN);
            setAgentDetails({
                agentName: data.username,
                languages:data.languages,
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



    return (
        <>
            {show ? (
                <div onClick={selectReader} tabIndex={0} className="reader-container">
                    <div className="reader-content">
                        <p className="reader-name" >
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
                            <img src={imageSrc} className="reader-image"  />
                        ) : (
                            <div className="loader-container">
                                <ClipLoader color={"#000000"} size={"3vmin"} />
                            </div>
                        )}

                        <Buttons pi={PIN} status={status} phoneStatus={phoneStatus}/>


                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
