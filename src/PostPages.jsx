import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link, Navigate} from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from "./LoadingSpinner";

const PostPages = () => { 
    const [redirect, setRedirect] = useState(false);
    const [postInfo,setPostInfo] = useState(null);
    const [isLoading,setLoading] = useState(false);
    const url_post = process.env.REACT_APP_EXPRESS_URL+"/post/";
    const url_delete = process.env.REACT_APP_EXPRESS_URL+"/delete/"
    const {id} = useParams();
    useEffect(() => {
        setLoading(true);
      fetch(`${url_post}${id}`)
        .then(response => {
          response.json().then(postInfo => {
            setPostInfo(postInfo);
          });
          setLoading(false);
        });
        
    }, []);

    const deletePost = async () => {
        setLoading(true);
        await fetch(`${url_delete}${id}`)
        .then(setRedirect(true)
        );
        setLoading(false);
    };

    if (redirect) {
        return <Navigate to={'/'} />
      }
  
    if (!postInfo) return '';
  
    const renderPage =  (
        <Container>
      <div className="post-page">
        <h1>{postInfo.title}</h1>
        <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}} />
        <div className = "buttons">
        <Link to={`/edit/${postInfo._id}`}>
              <button className="edit">Edit this post</button>
        </Link>
        <button onClick={deletePost}>delete</button>
        </div>
      </div>
        </Container>
      
    );

    return (
        <>
        {isLoading?<LoadingSpinner/>:renderPage}
        </>
    )
  };

  const Container = styled.div`
  width:80%;
  padding:2% 10%;
  .post-page{
    padding:5% 10%;
    border: 2px solid black;
    border-radius:20px;
  }
  h1{
    margin-top:0;
  }
  .edit{
    padding:5px 10px;
  }
  .buttons {
    margin:2% 0;
    display:flex;
    gap: 2rem;
  }
  `;

export default PostPages;