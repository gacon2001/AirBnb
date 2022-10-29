import styled from 'styled-components';
  
export const Button = styled.div`
   position: fixed; 
   width: 100%;
   left: 45%;
   bottom: 40px;
   height: 20px;
   font-size: 3rem;
   z-index: 1;
   cursor: pointer;
   color: rgb(255, 56, 92);
   transition: .5s;
   margin-bottom: 7px;
   &:hover{
       color: black;
   }
`