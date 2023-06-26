import React from "react";
import styled from 'styled-components';

export default function LoadingSpinner() {
  return (
    <Spinner>
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
    </Spinner>
  );
}

const Spinner = styled.div`
@keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-spinner {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50px;
    height: 50px;
    border: 10px solid #f3f3f3; 
    border-top: 10px solid #383636; 
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
  }
`;
