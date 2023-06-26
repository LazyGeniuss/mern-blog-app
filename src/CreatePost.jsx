import React from 'react';
import { useState} from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';

const CreatePost = () => {
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const date = new Date();
    const url = process.env.REACT_APP_EXPRESS_URL+"/post";
    async function createNewPost(ev) {
    const data = {
        title: title,
        summary:summary,
        content: content,
        date: date
    };

      ev.preventDefault();
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
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
      return <Navigate to={'/'} />
    }
    const renderPage =  (
        <Container>
      <form onSubmit={createNewPost}>
        <input className='title'
               type="title"
               placeholder={'Title'}
               value={title}
               onChange={ev => setTitle(ev.target.value)} />
        <input className="summary" 
               type="summary"               
               placeholder={'Summary'}
               value={summary}
               onChange={ev => setSummary(ev.target.value)} />
        <input className=" "
               type="content"
               placeholder={'content'}
               value={content}
               onChange={ev => setContent(ev.target.value)} />
        <button style={{marginTop:'5px'}}>Create post</button>
      </form>
        </Container>
    );

    return (
        <>
        {isLoading? <LoadingSpinner/>:renderPage}
        </>
    )
}

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

export default CreatePost;