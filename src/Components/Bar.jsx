import { motion } from 'framer-motion';
import React, { Component } from 'react';

class Bar extends Component {


    render() {
        return (
            <motion.div 
                initial={
                    {
                        x:this.props.x,
                        backgroundColor:this.props.color
                    }
                }
                animate={

                    (this.props.isBlink)?
                    {
                        backgroundColor:['rgb(250, 237, 39)',this.props.color,'rgb(250, 237, 39)'],
                        x:this.props.x,
                    }
                    :
                    {
                        x:this.props.x,
                        backgroundColor:this.props.color
                    }
                }
                transition={
                    (this.props.isBlink)?
                    {
                        repeat:Infinity,
                        repeatDelay:0.7, 
                        // ease:1,
                    }
                    :
                    {duration:1}
                }
                style={{height:this.props.value,width:`${this.props.width}px`,margin:'5px',color:'#303F9F',fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'flex-end'}}
            >
                {
                    (this.props.width===30)?this.props.value:null
                }
            </motion.div>
        );
    }
}

export default Bar;