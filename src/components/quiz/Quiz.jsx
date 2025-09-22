import { useRef, useState } from 'react'
import './Quiz.css'
import {data} from '../../assets/data'
const Quiz = ()=>{
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score,setScore] = useState(0);
    let [ result,setResult] = useState(false)

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_array = [Option1,Option2,Option3,Option4];

    const next =() =>{
        if(lock === true){
            if(index === data.length-1){
                  setResult(true);
                  return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("correct");
                option.current.classList.remove("wrong");
                return null;
            })

        }
    }

    const CheckAns = (e,ans)=>{
        if(lock === false){
           if(Number(question.ans) === Number(ans)){
            e.target.classList.add("correct")
            setLock(true)
        }
        else{
            e.target.classList.add("wrong")
            setLock(true);
            option_array[question.ans-1].current.classList.add("correct")
        }
        }
        
    }

    const reset = ()=>{
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false)
    }
        return(
        <div className='container'>
         <h1>Quiz App</h1>
         <hr></hr>
         {result ? <></> : 
         <>
         <div>
            
            <h3>{index+1}. {question.question}</h3>
            <ul>
                <li ref={Option1} onClick={(e)=>{CheckAns(e,1)}}>{question.option1}</li>
                <li ref={Option2} onClick={(e)=>{CheckAns(e,2)}}>{question.option2}</li>
                <li ref={Option3} onClick={(e)=>{CheckAns(e,3)}}>{question.option3}</li>
                <li ref={Option4} onClick={(e)=>{CheckAns(e,4)}}>{question.option4}</li>
            </ul>
            
         </div>
         <button onClick={next} className='btn'>Next</button>
           <p className='index'>{index+1} to {data.length} question</p>
         </>}
         {result ? 
         <>
          <p> you score {score} out of {data.length}</p>
         <button onClick={reset} className='btn'>reset</button>
         </> 
         : <></>}
        
        </div>
    )
}
export default Quiz