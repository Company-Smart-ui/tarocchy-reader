
export default function PageSelector(data) {
    const setPage = data.setPage;
    const pageCount = data.pageCount;
    const page = data.page;
    return (
        <div className="pages">
            {[...Array(pageCount)].map((item, i) => (
                <button className={page === i ? "page-selector-button selected" : "page-selector-button"} key={i} onClick={setPage.bind(this, i)}>
                    {i + 1}
                </button>
            ))}
        </div>
    );
}
