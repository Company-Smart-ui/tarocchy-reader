import React from 'react';
import {userStatus} from "../../ServerCommunication";
import PhoneIcon from "./phone.png"

const IconPhone  = ()=>{
    return <img src={PhoneIcon} alt="phone "/>
}


export const Buttons = ({status ,phoneStatus , pi}) => {
    const PIN = pi

    function openChat(e) {
        e.stopPropagation();
        document.cookie = `pin=${PIN}`;
        window.location.href = `/chat?pin=${PIN}`;
    }
    function openCall(e) {
        e.stopPropagation();
        window.location.href = `/chat?redirect=call&pin=${PIN}`;
    }
    return                      <div className="reader-button-container">


        {status === userStatus.online && (
            <button className="reader-button user-online" onClick={openChat}>
                CHAT NOW
            </button>
        )}
        {status === userStatus.offline && (
            <button className="reader-button user-offline reader-button-icon" onClick={openChat}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00015 1.23071C3.90785 1.23071 0.646306 4.2461 0.646306 7.96917C0.646306 9.13841 0.984768 10.2461 1.53861 11.2307C1.63092 11.3846 1.66169 11.5692 1.60015 11.7538L0.646306 14.3692C0.553999 14.6153 0.800152 14.8307 1.04631 14.7692L3.69246 13.7538C3.84631 13.6923 4.03092 13.723 4.21554 13.8153C5.32323 14.4307 6.64631 14.7999 8.06169 14.7999C12.0925 14.7692 15.3848 11.7846 15.3848 8.03071C15.354 4.2461 12.0617 1.23071 8.00015 1.23071ZM4.30784 9.23071C3.63092 9.23071 3.07708 8.67687 3.07708 7.99994C3.07708 7.32302 3.63092 6.76917 4.30784 6.76917C4.98477 6.76917 5.53861 7.32302 5.53861 7.99994C5.53861 8.67687 4.98477 9.23071 4.30784 9.23071ZM8.00015 9.23071C7.32323 9.23071 6.76938 8.67687 6.76938 7.99994C6.76938 7.32302 7.32323 6.76917 8.00015 6.76917C8.67708 6.76917 9.23092 7.32302 9.23092 7.99994C9.23092 8.67687 8.67708 9.23071 8.00015 9.23071ZM11.6925 9.23071C11.0155 9.23071 10.4617 8.67687 10.4617 7.99994C10.4617 7.32302 11.0155 6.76917 11.6925 6.76917C12.3694 6.76917 12.9232 7.32302 12.9232 7.99994C12.9232 8.67687 12.3694 9.23071 11.6925 9.23071Z" fill="white"/>
                </svg>
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
            <button className="reader-button user-offline reader-button-icon" onClick={openCall}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_103_4)"><path d="M5.8859 4.80161L4.2758 6.41346C4.2758 6.41346 5.6125 10.2182 9.41053 11.5577L10.8313 10.1348L14.5445 11.0093C14.5445 11.0093 15.1943 11.1868 15.1822 12.0257C15.1822 12.0257 15.4298 13.982 12.8981 15.0492C8.49719 16.3319 -0.132641 8.2559 0.88143 3.01453C0.88143 3.01453 1.85082 0.572101 3.9918 0.819378C3.9918 0.819378 4.55299 0.622922 4.81957 1.45957L5.8859 4.80161Z" fill="white"/></g><defs><clipPath id="clip0_103_4"><rect width="16" height="15.9844" fill="white"/></clipPath></defs></svg>
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
            <button className="reader-button user-offline reader-button-icon" onClick={openCall}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_103_4)"><path d="M5.8859 4.80161L4.2758 6.41346C4.2758 6.41346 5.6125 10.2182 9.41053 11.5577L10.8313 10.1348L14.5445 11.0093C14.5445 11.0093 15.1943 11.1868 15.1822 12.0257C15.1822 12.0257 15.4298 13.982 12.8981 15.0492C8.49719 16.3319 -0.132641 8.2559 0.88143 3.01453C0.88143 3.01453 1.85082 0.572101 3.9918 0.819378C3.9918 0.819378 4.55299 0.622922 4.81957 1.45957L5.8859 4.80161Z" fill="white"/></g><defs><clipPath id="clip0_103_4"><rect width="16" height="15.9844" fill="white"/></clipPath></defs></svg>
                OFFLINE
            </button>
        )}
    </div>
};
 