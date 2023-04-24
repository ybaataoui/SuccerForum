import { Link } from "react-router-dom";
import { useState } from "react";


const Card = (props) => {
    const [count, setCount] = useState(0)
    //const [postedTime, setTime] = ([]);
    const currentDate = new Date();
    const createdDate = new Date(props.postedDate);

    const datePosted = () => {
        const datePInMilliseconds= currentDate.getTime() - createdDate.getTime();
        const diffInHours = datePInMilliseconds / (1000 * 3600)
        //setPostedDate(diffInHours);
        return Math.round(diffInHours);
    }


    
    //console.log(datePosted())
    return (
        <div className="container-fluid">
            <div className="card">
                <p>Posted {datePosted()} hours ago</p>
                <h2 className="title">{props.title}</h2>
                <p>{props.upvote} upvotes</p>
            </div>
        </div>
    )
}

export default Card;