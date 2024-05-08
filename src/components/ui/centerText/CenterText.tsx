import "./style.css";

export default function CenterText({text}: {text:string}) {
    return (
        <div className="center-div">
           <p className="center-p"> {text} </p>
        </div>
    )
}
