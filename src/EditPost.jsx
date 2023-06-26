import React from 'react';
import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';

const EditPost = () => {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [redirect,setRedirect] = useState(false);
    const [isLoading,setLoading] = useState(false);
    const date = new Date();
    const url = process.env.REACT_APP_EXPRESS_URL+"/post/";

  useEffect(() => {
    setLoading(true);
    fetch(url+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setLoading(false);
        });
      });
      
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = {
        title: title,
        summary:summary,
        content: content,
        date: date
    };

    setLoading(true);
    const response = await fetch('url', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    setLoading(false);

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  const renderPage =  (
    <Container>
    <form onSubmit={updatePost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="content"
             onChange={ev => setContent(ev.target.value)} />
      <button style={{marginTop:'5px'}}>Update post</button>
    </form>
    </Container>
  )

    return (
        <>
        {isLoading?<LoadingSpinner/>:renderPage}
        </>
    )
};

const Container = styled.div`
width:100%;
margin-top:5%;
form {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border: 2px solid black;
    border-radius:20px;
    width:30%;
    margin:0 30%;
    padding:2% 0;
}
input {
    width:75%;
    margin:1%;
}
`;


export default EditPost