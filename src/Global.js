import Events from "./Events";

const globalEvents = new Events();
const globalThis = {
    events: globalEvents,
    socket: null,
    url: "",
    imageSocket: null,
    selectedReader: null,
    maxAgentsPerPage: 18,
    isLoggedIn: false,
    userEmail: null,
    password: "",
    email: "",
};

export default globalThis;
