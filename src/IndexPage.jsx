import React from 'react';
import { useState, useEffect } from 'react';
import Post from './Post';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';

const IndexPage = () => {  
    const [posts,setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const url = process.env.REACT_APP_EXPRESS_URL+"/post";
    useEffect(() => {
        console.log(url);
        setLoading(true);
      fetch(url).then(response => {
        response.json().then(posts => {
          setPosts(posts);
          setLoading(false);
        });
      });
      
    }, []);
    const renderPage =  (
      <FormContainer>
        {posts.length > 0 && posts.map(post => (
            <div className = "posts" key={post._id}>
                <Post {...post} />
            </div>
        ))}
      </FormContainer>
    );

    return (
        <>
        {isLoading ? <LoadingSpinner/>:renderPage}
        </>
    )
}

const FormContainer = styled.div`
padding: 0 10%;
height: 100vh;
width: 80%;
justify-content: center;
gap: 1rem;
align-items: center;

.posts{
    padding: 2%;
    margin:2%;
    border: 2px solid black;
    border-radius:20px;
}
`;

export default IndexPage;