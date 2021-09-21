import { Button, Divider, Slider } from '@material-ui/core';
import React, { Component } from 'react';
import Bar from './Bar';
import {sleep} from '../helper';
import _ from 'lodash';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';


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
        this.setState({arraySize:val})
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
            arr = [...arr,{val:Math.floor(rand),x:0,index:i,color:'#00FFFF'}];
        }
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
        
        for(let i=0;i<n-1;i++){
            await sleep(outerms);
            for(let j=0;j<n-i-1;j++){
                await sleep(innerms);
                arr[temp_arr[j].index].color = '#303F9F';
                arr[temp_arr[j+1].index].color = '#303F9F';
                this.setState({arr});
                if(temp_arr[j].val > temp_arr[j+1].val){
                    let temp_obj = temp_arr[j];
                    temp_arr[j] = temp_arr[j+1];
                    temp_arr[j+1] = temp_obj;


                    arr[temp_arr[j].index].x -= (width+10);
                    arr[temp_arr[j+1].index].x += (width+10);                                     

                    
                }
                console.log('arr',arr)
                
                arr[temp_arr[j].index].color = '#00FFFF';
                arr[temp_arr[j+1].index].color = '#00FFFF';
                setTimeout(() => {
                    
                    this.setState({arr});
                }, innerms);
  
            }
        }
    }

    stopAnimation = ()=>{
        window.location.reload();
        this.setState({stop:true})
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
                <div style={{width:'95vw',display:'flex',justifyContent:'flex-between'}}>
                    <div style={{backgroundColor:'#00182E',border:'1px solid #C51162',width:'40vw',margin:'50px',color:'white'}}>
                        <div style={{padding:'10px'}}>
                            <motion.h1 
                                style={{margin:'10px',fontSize:'40px'}}>
                                Theory:
                            </motion.h1>
                            <Divider style={{height:'2px',width:'20%',margin:'10px',backgroundColor:'white'}}/>
                            <div style={{padding:'10px',fontSize:'20px'}}>
                                Bubble sort is a simple sorting algorithm.
                                This sorting algorithm is comparison-based algorithm in which each pair of adjacent 
                                elements is compared and the elements are swapped if they are not in order. The algorithm, 
                                which is a comparison sort, is named for the way smaller or larger elements "bubble" to the 
                                top of the list. This algorithm is not suitable for large data sets.
                                Although bubble sort is one of the simplest sorting algorithms to understand and implement, 
                                its O(n2) complexity means that its efficiency decreases dramatically on lists of more than a
                                 small number of elements. Even among simple O(n2) sorting algorithms, algorithms like insertion
                                sort are usually considerably more efficient.
                                Due to its simplicity, bubble sort is often used to introduce the concept of an algorithm, or a 
                                sorting algorithm, to introductory computer science students. However, some researchers such as 
                                Owen Astrachan have gone to great lengths to disparage bubble sort and its continued popularity 
                                in computer science education, recommending that it no longer even be taught.
                            </div>
                        </div>
                    </div>
                    <div style={{backgroundColor:'#00182E',border:'1px solid #C51162',width:'40vw',margin:'50px',color:'white'}}>
                        <div style={{padding:'10px'}}>
                            <motion.h1 
                                style={{margin:'10px',fontSize:'40px'}}>
                                Analysis:
                            </motion.h1>
                            <Divider style={{height:'2px',width:'20%',margin:'10px',backgroundColor:'white'}}/>
                            <div style={{margin:'10px'}}>
                                <h2 style={{fontSize:'25px'}}>Time Complexity</h2>
                                <div style={{fontSize:'20px'}}>Best Case</div>
                                <ul style={{padding:'10px',fontSize:'20px'}}>
                                    <li>The best-case scenario for bubble sort is when the array is already sorted. For this the algorithm works with least time complexity</li>
                                    <li>Time complexity – O(n)</li>
                                </ul>
                                <div style={{fontSize:'20px'}}>Worst Case</div>
                                <ul style={{padding:'10px',fontSize:'20px'}}>
                                    <li>The worst-case scenario for bubble sort is when the array is reversely sorted. For this the algorithm works with most time complexity</li>
                                    <li>Time complexity – O(n2) </li>
                                </ul>
                                <div style={{fontSize:'20px'}}>Average Case</div>
                                <ul style={{padding:'10px',fontSize:'20px'}}>
                                    <li>On any other test case the algorithm works with a time complexity of O(n2)</li>
                                </ul>
                                <h2 style={{fontSize:'25px'}}>Space Complexity</h2>
                                <div>The space complexity for Bubble Sort is O(1), because only a single additional memory space is required i.e. for “i” variable.</div>
                            </div> 
                        </div>
                        
                    </div>
                </div>
                <div style={{width:'95vw',display:'flex',justifyContent:'flex-between'}}>
                    <div style={{backgroundColor:'#00182E',border:'1px solid #C51162',width:'40vw',margin:'50px',color:'white'}}>
                        <div style={{padding:'10px'}}>
                            <motion.h1 
                                style={{margin:'10px',fontSize:'40px'}}>
                                Pseudocode:
                            </motion.h1>
                            <Divider style={{height:'2px',width:'20%',margin:'10px',backgroundColor:'white'}}/>
                            <div style={{fontSize:'20px'}}>
                                <ol>
                                    <li>We are given with an input array which is supposed to be sorted in ascending order</li>
                                    <li>We start with the first element and i=0 index and check if the element present at i+1 is greater, then we swap the elements at index i and i+1.</li>
                                    <li>If above is not the case, then no swapping will take place.</li>
                                    <li>Now, “i” gets incremented and the above 2 steps happen again until the array is exhausted.</li>
                                    <li>We will ignore the last index as it is already sorted.</li>
                                    <li>Now the largest element will be at the last index of the array.</li>
                                    <li>Now we will again set i=0 and continue with the same steps that will eventually place second largest at second last place in the array. Now the last 2 indexes of the array are sorted.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        );
    }
}

export default BubbleSort;