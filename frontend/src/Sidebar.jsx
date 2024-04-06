export default function Sidebar(poi) {
    
    let name = poi['poi'];

    return(
        <div className="sidebar p-5 rounded-l-xl border-black border min-w-24">
            <h1 className="pb-5">{name}</h1>
            <p>Click on a person to see their relationships</p>
        </div>
    )
}