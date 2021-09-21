import { Button, Divider, Slider } from '@material-ui/core';
import React, { Component } from 'react';
import Bar from './Bar';
import {sleep} from '../helper';
import _ from 'lodash';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CustomButton from './Button';


const MySlider = withStyles({
    markLabel:{
      color:"#fff",
      fontSize:'13px',
      
    },

  })(Slider);
  
  const marks = [
    {
      value: 1,
      label: '1X',
    },
    {
      value: 2,
      label: '2X',
    },
    {
      value: 3,
      label: '3X',
    },
  ];

class BubbleSort extends Component {
    constructor(props) {
        super(props);
        this.state={
            arraySize:20,
            arr:[],
            width:30,
            speed:1,
            stop:true,
            isBlink:false,
            target:1,
        }

        
    }

    valuetext = (value)=> {
        return `${value-1}X`;
    }

    componentDidMount(){
        this.changeWidth();
        this.generateNewArray();
        
    }

    changeWidth = ()=>{
        const {arraySize} = this.state;

        if(arraySize<=35){
            this.setState({width:30})
        }
        else if(arraySize>35 && arraySize<=50){
            this.setState({width:20})
        }
        else{
            this.setState({width:5})
        }
    }

    handleChangeSlider=(event,val)=>{
        this.setState({arraySize:val,stop:true})
        this.changeWidth();
        this.generateNewArray();
    }

    handleChangeSpeedSlider = (event,val)=>{
        this.setState({speed:val});
    }

    generateNewArray=()=>{
        this.changeWidth();
        let arr = [];
        let min = 1,max = 500;
        for(let i=0;i<this.state.arraySize;i++){
            let rand = min + Math.random() * (max - min);
            arr = [...arr,{val:Math.floor(rand),x:0,index:i,color:'#00FFFF',isBlink:false}];
        }

        let mn = 0,mx=this.state.arraySize-1;
        let target_index = (mn + Math.random() * (mx - mn));

        
        let index = Math.floor(target_index)
        console.log(index)
        this.setState({target:arr[index].val});

        // if(Math.floor(target_index) === this.state.arraySize){
        //     let target = min + Math.random() * (max - min);
        //     this.setState({target});
        // }
        // else{
        //     this.setState({target:arr[Math.floor(target_index)]});
        // }
        // console.log(this.state.target);

        this.setState({arr,stop:true});
    }

    startAnimation= async ()=>{
        this.setState({stop:false});
        await sleep(100);

        const {width} = this.state;        

        let arr = this.state.arr;
        let temp_arr = _.clone(arr);
        let n = this.state.arraySize;
        let outerms,innerms;



        if(this.state.speed===1){
            outerms=500;
            innerms=1000;
        }
        else if(this.state.speed===2){
            outerms=200;
            innerms=500;
        }
        else{
            outerms=10;
            innerms=10;
        }
        
        for(let i=0;i<n;i++){
            await sleep(outerms);
            if(temp_arr[i].val === this.state.target){
                arr[temp_arr[i].index].color = "rgb(57, 255, 20)";
                arr[temp_arr[i].index].isBlink = true;
                setTimeout(() => {       
                    this.setState({arr});
                }, innerms);
                break;
            }

            arr[temp_arr[i].index].color = "rgb(202, 42, 37)";
            // await sleep(outerms);
            setTimeout(() => {       
                this.setState({arr});
            }, innerms);

            

            // arr[temp_arr[i].index].color = '#00FFFF';

            // setTimeout(() => {       
            //     this.setState({arr});
            // }, innerms);

            // for(let j=i+1;j<n;j++){
            //     await sleep(innerms);
            //     if(temp_arr[j].val<temp_arr[min].val){
            //         arr[temp_arr[min].index].color = '#00FFFF';
            //         min=j;
            //     }
            //     arr[temp_arr[i].index].color = '#303F9F';
            //     arr[temp_arr[j].index].color = '#303F9F';
            //     arr[temp_arr[min].index].color = '#C51162';
            //     this.setState({arr}); 
                
            //     if(j!==min){
            //         arr[temp_arr[j].index].color = '#00FFFF';
            //     }
            //     setTimeout(() => {
                    
            //         this.setState({arr});
            //     }, innerms);
  
            // }
            // if(min!==i){
            //     let temp_obj = temp_arr[min];
            //     temp_arr[min] = temp_arr[i];
            //     temp_arr[i] = temp_obj;


            //     arr[temp_arr[min].index].x += (width*(min-i)+(10*(min-i)));
            //     arr[temp_arr[i].index].x -= (width*(min-i)+(10*(min-i)));   
            //     setTimeout(() => {       
            //         this.setState({arr});
            //     }, innerms);                                      
            // }
            // console.log('arr',arr)
            // arr[temp_arr[min].index].color = '#00FFFF';
            // arr[temp_arr[i].index].color = '#00FFFF';
            // setTimeout(() => {       
            //     this.setState({arr});
            // }, innerms);
        }
    }

    stopAnimation = ()=>{
        this.setState({stop:true});
        window.location.reload();
    }
    
    render() {
        return (
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',height:'100px',width:'100%'}}>
                    <div style={{display:'flex'}}>
                        <motion.div 
                        
                        initial={{height:'70px',width:'150px',backgroundColor:'#4CAF50',color:'white',borderRadius:'5px',padding:'5px',boxShadow:'0px 2px green',marginTop:'-25px'}}
                        whileHover={{cursor:'pointer'}}
                        >
                            <Link  to="/" style={{height:'70px',width:'150px',textDecoration:'none',color:'white',display:'flex',justifyContent:'center'}}>
                                <p style={{height:'70px',width:'150px',display:'flex',justifyContent:'center'}}>Algorithm Visualizer</p>
                            </Link>
                        </motion.div>

                        <Button onClick={this.generateNewArray} style={{margin:'10px'}} color="primary" variant="contained">Generate New Array</Button>
                    </div>
                    <CustomButton number = {this.state.target}/>
                    
                    <Slider
                        style={{width:'300px',margin:'10px'}}
                        value={this.state.arraySize}
                        onChange={this.handleChangeSlider}
                        defaultValue={8}
                        min={1}
                        max={100}
                        valueLabelDisplay="auto"
                    />
                </div>
                <Divider style={{height:'2px',width:'100%',margin:'10px 10px 0px 10px',backgroundColor:'white'}}/>
                <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                    <div style={{width:'250px',backgroundColor:'#15314B',display:'flex',justifyContent:'center',marginRight:'5px'}}>
                        <div style={{width:150,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <MySlider
                            defaultValue={1}
                            getAriaValueText={this.valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            disabled={!this.state.stop}
                            onChange={this.handleChangeSpeedSlider}
                            marks = {marks}
                            min={1}
                            max={3}
                            
                        />
                        </div>
                    </div>
                    
                </div>
                

                <div style={{display:'flex',justifyContent:'center',alignItems:'flex-end'}}>
                    {
                        this.state.arr.map((item,index)=>(
                            <div key={index}>
                            <Bar
                                value={item.val}
                                x = {item.x}
                                color={item.color}
                                width={this.state.width}
                                isBlink = {item.isBlink}

                            />
                            </div>
                        ))
                    }
                </div>
                <div style={{display:'flex'}}>
                    <Button onClick={this.startAnimation} style={{width:'200px', margin:'20px'}} color="secondary" variant="contained">Start</Button>
                    <Button onClick={this.stopAnimation} style={{width:'200px', margin:'20px'}} color="secondary" variant="contained">Stop</Button>
                </div>
                
                <Divider style={{height:'2px',width:'100%',margin:'10px',backgroundColor:'white'}}/>
            </div>
        );
    }
}

export default BubbleSort;