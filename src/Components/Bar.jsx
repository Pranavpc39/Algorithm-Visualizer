import { motion } from 'framer-motion';
import React, { Component } from 'react';

class Bar extends Component {


    render() {
        return (
            <motion.div 
                initial={{
                    x:this.props.x,
                    backgroundColor:this.props.color
                }}
                animate={{
                    x:this.props.x,
                    backgroundColor:this.props.color
                }}
                transition={{duration:1}}
                style={{height:this.props.value,width:`${this.props.width}px`,margin:'5px',color:'#fff',display:'flex',justifyContent:'center',alignItems:'flex-end'}}
            >
                {
                    (this.props.width===30)?this.props.value:null
                }
            </motion.div>
        );
    }
}

export default Bar;