import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
    <header>
        <div className='title'>Blog App</div>
        <div className='postbuttton-container'>
        <Link to={'/create'}>
            <div className='postbutton'>
                <button>Create Post</button>
            </div>
        </Link>
        </div>
    </header>
    </Container>
  )
}

const Container = styled.div`
header {
width:100%;
display:flex;
background-color: #808080;
padding:1% 0;
}
.postbutton-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: auto;
  }
.postbutton{
    width:100%;
    padding:0 0;
    margin: 10px 0px;
}
.title{
    margin-left:45%;
    margin-right:30%;
    font-size:23px;
    font-weight:bold;
    padding:5px;
}
`;

export default Header;