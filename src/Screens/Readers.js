
import { useEffect, useState } from "react";
import { events, userStatus } from "../ServerCommunication";
import globalThis from "../Global";
import Header from "../Components/Header";
import ReaderSingle from "./ReaderSingle";
import Reader from "../Components/Reader";
import PageSelector from "../Components/PageSelector";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//globalThis.selectedReader = urlParams.get("reader");

//var agents = [];
var allAgents = [];
export default function Readers() {
    const [agentStatus, setAgentStatus] = useState([]);
    const [sortedAgents, setSortedAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [agents, setAgents] = useState([]);
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [filteredAgents, setFilteredAgents] = useState([]);

    useEffect(() => {
        globalThis.events.addEventListener(events.agentStatusResponse, agentStatusResponse);
        globalThis.events.addEventListener(events.allAgentPINsResponse, allAgentPINsResponse);
        globalThis.events.addEventListener(events.allAgentPINsRequest, allAgentPINsRequest);
        globalThis.events.addEventListener(events.agentPINsInCategoryResponse, agentPINsInCategoryResponse);
        //  globalThis.events.addEventListener(events.agentStatusRequest, agentStatusRequest);
        //   // globalThis.events.addEventListener(events.downloadAgentProfilePictureRequest, downloadAgentProfilePictureRequest);
        return function cleanup() {
            //console.log("asd");
            // globalThis.events.removeEventListener(events.agentStatusRequest);
            globalThis.events.removeEventListener(events.allAgentPINsRequest);
            globalThis.events.removeEventListener(events.agentStatusResponse);
            globalThis.events.removeEventListener(events.agentPINsInCategoryResponse);
            globalThis.events.removeEventListener(events.allAgentPINsResponse);
        }; //;
    });

    function sortAgents() {
        var sortedAgentList = [];
        var includes = [];
        // console.log(filteredAgents);
        for (let i = 0; i < agentStatus.length; i++) {
            if (agentStatus[i].agentStatus === userStatus.online || agentStatus[i].phoneStatus === userStatus.online) {
                if (!includes.includes(agents[i])) {
                    //  if (filteredAgents.includes(agents[i])) {
                    //   sortedAgentList.unshift({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                    //  } else {
                    if (filteredAgents.includes(agents[i])) {
                        sortedAgentList.push({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                        includes.push(agents[i]);
                    }
                    //  }
                }
            }
        }
        for (let i = 0; i < agentStatus.length; i++) {
            if (agentStatus[i].agentStatus === userStatus.busy) {
                if (!includes.includes(agents[i])) {
                    // if (filteredAgents.includes(agents[i])) {
                    //      sortedAgentList.unshift({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                    //  } else {
                    if (filteredAgents.includes(agents[i])) {
                        sortedAgentList.push({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                        includes.push(agents[i]);
                    } // }
                }
            }
        }
        for (let i = 0; i < agentStatus.length; i++) {
            if (agentStatus[i].agentStatus === userStatus.away) {
                if (!includes.includes(agents[i])) {
                    //  if (filteredAgents.includes(agents[i])) {
                    //    sortedAgentList.unshift({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                    // } else {
                    if (filteredAgents.includes(agents[i])) {
                        sortedAgentList.push({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                        includes.push(agents[i]);
                    } //  }
                }
            }
        }
        for (let i = 0; i < agentStatus.length; i++) {
            if (agentStatus[i].agentStatus === userStatus.offline || agentStatus[i].phoneStatus === userStatus.offline) {
                if (!includes.includes(agents[i])) {
                    //  if (filteredAgents.includes(agents[i])) {
                    //       sortedAgentList.unshift({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                    //   } else {
                    if (filteredAgents.includes(agents[i])) {
                        sortedAgentList.push({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                        includes.push(agents[i]);
                    } //    }
                }
            }
        }

        for (let i = 0; i < agentStatus.length; i++) {
            if (agentStatus[i].agentStatus === userStatus.online || agentStatus[i].phoneStatus === userStatus.online) {
                if (!includes.includes(agents[i])) {
                    //  if (filteredAgents.includes(agents[i])) {
                    //   sortedAgentList.unshift({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                    //  } else {
                    if (!filteredAgents.includes(agents[i])) {
                        sortedAgentList.push({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                        includes.push(agents[i]);
                    }
                    //  }
                }
            }
        }
        for (let i = 0; i < agentStatus.length; i++) {
            if (agentStatus[i].agentStatus === userStatus.busy) {
                if (!includes.includes(agents[i])) {
                    // if (filteredAgents.includes(agents[i])) {
                    //      sortedAgentList.unshift({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                    //  } else {
                    if (!filteredAgents.includes(agents[i])) {
                        sortedAgentList.push({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                        includes.push(agents[i]);
                    } // }
                }
            }
        }
        for (let i = 0; i < agentStatus.length; i++) {
            if (agentStatus[i].agentStatus === userStatus.away) {
                if (!includes.includes(agents[i])) {
                    //  if (filteredAgents.includes(agents[i])) {
                    //    sortedAgentList.unshift({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                    // } else {
                    if (!filteredAgents.includes(agents[i])) {
                        sortedAgentList.push({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                        includes.push(agents[i]);
                    } //  }
                }
            }
        }
        for (let i = 0; i < agentStatus.length; i++) {
            if (agentStatus[i].agentStatus === userStatus.offline || agentStatus[i].phoneStatus === userStatus.offline) {
                if (!includes.includes(agents[i])) {
                    //  if (filteredAgents.includes(agents[i])) {
                    //       sortedAgentList.unshift({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                    //   } else {
                    if (!filteredAgents.includes(agents[i])) {
                        sortedAgentList.push({ pin: agents[i], status: agentStatus[i].agentStatus, phoneStatus: agentStatus[i].phoneStatus });
                        includes.push(agents[i]);
                    } //    }
                }
            }
        }
        /* var maxReadersPerPage = [];
        var maxAgents = page * globalThis.maxAgentsPerPage;
        for (let j = maxAgents; j < globalThis.maxAgentsPerPage + maxAgents; j++) {
            if (sortedAgentList[j] !== undefined) {
                maxReadersPerPage.push(sortedAgentList[j].pin);
            }
        }*/
        //   setPageCount(5);
        // setVisibleAgents(maxReadersPerPage);
        setSortedAgents(sortedAgentList);
    }

    function agentStatusResponse(data) {
        var statusList = [];
        for (var i = 0; i < data.agentStatusList.length; i++) {
            statusList.push({ agentStatus: data.agentStatusList[i], phoneStatus: data.phoneStatusList[i] });
        }
        //  for( var i = 0;)
        setAgentStatus(statusList);
    }

    useEffect(() => {
        sortAgents();
    }, [agentStatus]);

    useEffect(() => {
        /* if (agents.length !== 0) {
            if (globalThis.online) {
                globalThis.socket.send(JSON.stringify({ event: events.agentStatusRequest, agentPINs: agents }));
            }
        }
*/
        // sortAgents();
        var element = document.getElementById("single-reader-container-id");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }, [page]);

    useEffect(() => {
        if (agents.length !== 0) {
            if (globalThis.online) {
                globalThis.socket.send(JSON.stringify({ event: events.agentStatusRequest, agentPINs: agents }));
            }
            /*var pages;
            if (agents.length % globalThis.maxAgentsPerPage === 0) {
                pages = agents.length / globalThis.maxAgentsPerPage;
            } else {
                pages = Math.floor(agents.length / globalThis.maxAgentsPerPage) + 1;
            }*/
            //setPageCount(pages);
        }
        allAgents = agents;
    }, [agents]);

    /*  useEffect(() => {
        if (filteredAgents.length !== 0) {
            if (globalThis.online) {
                globalThis.socket.send(JSON.stringify({ event: events.agentStatusRequest, agentPINs: filteredAgents }));
            }
            var pages;
            if (filteredAgents.length % globalThis.maxAgentsPerPage === 0) {
                pages = filteredAgents.length / globalThis.maxAgentsPerPage;
            } else {
                pages = Math.floor(filteredAgents.length / globalThis.maxAgentsPerPage) + 1;
            }
            setPageCount(pages);
        }
    }, [filteredAgents]);*/

    useEffect(() => {
        var element = document.getElementById("single-reader-container-id");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }, [selectedAgent]);

    function agentPINsInCategoryResponse(data) {
        // console.log(data);
        //console.log(data);
        setFilteredAgents(data.agentPINs);

        //setAgents(data.agentPINs);
        //getStatus(); //agentStatusRequest();
        // setAgents(data.agentPINs);
        //agentStatusRequest();
    }

    function allAgentPINsResponse(data) {
        // console.log(data);
        //console.log(data);
        setAgents(data.agentPINs); //getStatus(); // agentStatusRequest();
        setFilteredAgents(data.agentPINs);
        // setAgents(data.agentPINs);
        //agentStatusRequest();
    }

    useEffect(() => {
        // console.log(filteredAgents);
        sortAgents();
        var pages;
        if (filteredAgents.length % globalThis.maxAgentsPerPage === 0) {
            pages = filteredAgents.length / globalThis.maxAgentsPerPage;
        } else {
            pages = Math.floor(filteredAgents.length / globalThis.maxAgentsPerPage) + 1;
        }
        // console.log(filteredAgents);
        setPageCount(pages);
    }, [filteredAgents]);

    function allAgentPINsRequest() {
        globalThis.socket.send(JSON.stringify({ event: events.allAgentPINsRequest, showVisibleOnly: true }));
    }

    function resetPage() {
        setPage(0);
    }

    useEffect(() => {
        agentStatusRequest();
    }, []);

    function agentStatusRequest() {
        if (allAgents.length !== 0) {
            if (globalThis.online) {
                globalThis.socket.send(JSON.stringify({ event: events.agentStatusRequest, agentPINs: allAgents }));
            }
        }
        setTimeout(() => {
            agentStatusRequest();
        }, 1000);
    }

    return (
        <div>
            <div>
                <Header setAgent={setSelectedAgent} resetPage={resetPage} />
                {selectedAgent && <ReaderSingle agentDetails={selectedAgent.agentDetails} imageSrc={selectedAgent.agentImage} setAgent={setSelectedAgent} />}
                <div style={selectedAgent && { display: "none" }} className="readers-container">
                    {sortedAgents.map((agent, index) => {
                        // console.log(index);
                        if (index < (page + 1) * globalThis.maxAgentsPerPage && index >= page * globalThis.maxAgentsPerPage) {
                            if (filteredAgents.includes(agent.pin)) {
                                return (
                                    <Reader
                                        PIN={agent.pin}
                                        status={agent.status}
                                        phoneStatus={agent.phoneStatus}
                                        key={agent.pin}
                                        setAgent={setSelectedAgent}
                                        show={true}
                                    />
                                );
                            } else {
                                return (
                                    <Reader
                                        PIN={agent.pin}
                                        status={agent.status}
                                        phoneStatus={agent.phoneStatus}
                                        key={agent.pin}
                                        setAgent={setSelectedAgent}
                                        show={false}
                                    />
                                );
                            }
                        } else {
                            return (
                                <Reader
                                    PIN={agent.pin}
                                    status={agent.status}
                                    phoneStatus={agent.phoneStatus}
                                    key={agent.pin}
                                    setAgent={setSelectedAgent}
                                    show={false}
                                />
                            );
                        }
                    })}
                </div>
                {!selectedAgent && <PageSelector setPage={setPage} pageCount={pageCount} page={page} />}
            </div>
        </div>
    );
}
