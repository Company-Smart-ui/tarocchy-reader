import "../Styles/Styles.css";
import globalThis from "../Global";
import { events } from "../ServerCommunication";

import HamburgerIcon from "../Images/hamburger.svg";

const categories = ["ALL READERS", "TAROT", "PSYCHICS", "HEALERS", "LOVE ADVICE", "MEDIUMS", "RUNES", "REMOVING ATTACHMENTS"];

export default function Header(data) {
    const setAgent = data.setAgent;
    const resetPage = data.resetPage;

    function showCategories() {
        var headerClass = document.getElementById("category-container");
        if (headerClass.style.display === "flex") {
            headerClass.style.display = "none";
        } else {
            headerClass.style.display = "flex";
        }
    }
    function Category(data) {
        const category = data.category;
        function setNewCategory() {
            /*var headerClass = document.getElementById("category-container");
            if (headerClass.style.display === "flex") {
                headerClass.style.display = "none";
            } else {
                headerClass.style.display = "flex";
            }*/
            setAgent(null);
            resetPage();
            switch (category) {
                case "ALL READERS":
                    globalThis.socket.send(
                        JSON.stringify({
                            event: events.allAgentPINsRequest,
                        })
                    );
                    /*globalThis.socket.send(
                        JSON.stringify({
                            event: events.agentPINsInCategoryRequest,
                            categoryName: ["TAROT", "MEDIUMS", "RUNES", "REMOVING ATTACHMENTS"],
                        })
                    );*/
                    break;
                default:
                    globalThis.socket.send(
                        JSON.stringify({
                            event: events.agentPINsInCategoryRequest,
                            categoryName: category,
                        })
                    );
                    break;
            }
        }
        return (
            <>
                <button className="header-category" onClick={setNewCategory}>
                    {category}
                </button>
            </>
        );
    }

    return (
        <div className="header-container" id="single-reader-container-id">
            <img src={HamburgerIcon} className="header-toggle" onClick={showCategories}></img>
            <div id="category-container">
                {categories.map((item, index) => {
                    return (
                        <>
                            <Category category={item} />
                            {/*index !== categories.length - 1 && <p>|</p>*/}
                        </>
                    );
                })}
            </div>
        </div>
    );
}
