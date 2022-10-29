import React, {useEffect, useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import { Button } from './stylesBackToTop';

export default function BackToTop() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300){
        setVisible(true)
      } 
      else if (scrolled <= 300){
        setVisible(false)
      }
    };
    
    const scrollToTop = () =>{
      window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        /* you can also use 'auto' behaviour
           in place of 'smooth' */
      });
    };
    
    useEffect(() => {
      window.addEventListener('scroll', toggleVisible);
      return () => window.removeEventListener('scroll', toggleVisible);
    }, [])

    return (
        <Button>
         <FaArrowCircleUp onClick={scrollToTop} 
         style={{display: visible ? 'inline' : 'none'}} />
        </Button>
      );
}
