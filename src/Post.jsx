import {Link} from "react-router-dom";
import styled from 'styled-components';

export default function Post({_id,title,summary,date}) {

    const date_string = (date) =>{
        let time = new Date(date);
        let timestamp = "";
        timestamp +=  time.getHours()+ ":" +time.getMinutes()+", "+time.getDate() + "-" + time.getMonth()+ "-" + time.getFullYear();
        return timestamp;
    }

  return (
    <FormContainer>
    <div className="post">
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <div>{date_string(date)}</div>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
    </FormContainer>
  );
}

const FormContainer = styled.div`
a{
    text-decoration: none;
}
h2{
    color:darkslategray;
    font-size: 27px;
    font-weight:bold;
}
`;
