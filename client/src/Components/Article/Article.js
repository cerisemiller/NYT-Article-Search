import React from 'react';

const Article = ({title, url, _id, date, handleClick, buttonText, saved}) => (
    <div className="article">
        <a href={url} target="_blank">{title}</a>  
        <em>{date}></em>     
        <button onClick={() => handleClick(_id)}>
            {buttonText}
        </button>
    </div>
)
  
export default Article;