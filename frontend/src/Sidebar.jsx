export default function Sidebar(props) {

    let full_name = props.name;
    let id = props.id;

    return(
        <div className="sidebar p-5 rounded-l-xl border-black border min-w-24">
            <h1 className="pb-5">{full_name}</h1>
            <a href={"https://www.imdb.com/name/" + id} target="_blank" rel="noreferrer">
                <img src="./imdb.svg" alt={full_name} className="rounded-lg max-h-10"/>
            </a>

            <p className="pt-5">Click on a person to see their relationships</p>
        </div>
    )
}