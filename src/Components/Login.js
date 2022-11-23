import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { events, responses, accountType } from "../ServerCommunication";
import globalThis from "../Global";

export default function Login(data) {
    var [password, setPassword] = useState("");
    var [email, setEmail] = useState("");

    const showPopup = data.showPopup;

    useEffect(() => {
        globalThis.events.addEventListener(events.authenticateAccountResponse, authenticateAccountResponse);
        return function cleanup() {
            globalThis.events.removeEventListener(events.authenticateAccountResponse);
        };
    });

    function updatePassword(e) {
        globalThis.password = e.target.value;
        setPassword(globalThis.password);
    }

    function updateEmail(e) {
        globalThis.email = e.target.value;
        setEmail(globalThis.email);
    }

    function authenticateAccountResponse(data) {
        switch (data.response) {
            case responses.failure:
                toast.warn("Login failure!");
                break;
            case responses.notFound:
                toast.warn("Bad email address or password!");
                break;
            case responses.serverError:
                toast.error("Server error!");
                break;
            case responses.authenticateAccount.alreadyLoggedIn:
                toast.warn("Already logged in!");
                break;
            case responses.success:
                console.log("login success");
                toast.success("Successful login");

                globalThis.isLoggedIn = true;
                showPopup(false);
                break;
            default:
                break;
        }
        toast.clearWaitingQueue();
    }

    function authenticateAccount() {
        //user = username;
        //navigate("/chat");
        console.log(email);
        console.log(password);
        if (globalThis.socket != null) {
            globalThis.socket.send(
                JSON.stringify({
                    event: "authenticateAccountRequest",
                    email: email,
                    password: password,
                    accountType: accountType.guest,
                })
            );
        }
        toast.clearWaitingQueue();
    }

    function closePopup() {
        showPopup(false);
    }
    return (
        <div className="register_login_container">
            <div className="login-register-container">
                <div className="title">Sign in</div>
                <div className="secondary-title">Email</div>
                <input type="email" placeholder="Enter email" onChange={(e) => updateEmail(e)}></input>
                <div className="secondary-title">Password</div>
                <input type="password" className="hidden" placeholder="Enter password" onChange={(e) => updatePassword(e)}></input>
                <div className="button-container">
                    <button className="login-register-button" onClick={authenticateAccount}>
                        {"Login"}
                    </button>
                </div>
                <div className="sign-up-style" style={{ marginTop: "1rem", marginBottom: "1rem", fontStyle: "italic" }}>
                    You must be logged in to talk to readers
                </div>
                <div className="sign-up-container">
                    <div className="sign-up-style">Don't have an account?</div>
                    <div className="sign-up-style sign-up-button">Signup now</div>
                </div>
                <div className="sign-up-style" style={{ marginTop: "2rem", marginBottom: "1rem", fontStyle: "italic", textAlign: "center" }}>
                    Forgot your password? <br></br>Email us at admin@tarocchy.com
                </div>
                <button onClick={closePopup}>Close</button>
            </div>
        </div>
    );
}
