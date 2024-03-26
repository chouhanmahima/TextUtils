import { useReducer } from 'react';
import './LandingScreen.css'

const initialValue = {
    input_data : "",
    total_characters : 0,
    total_words : 0,
    total_time_req_to_read : 0,
    dark_mode : false
}

function reducer(state, action){
    switch (action.type){
        case "change":{

            const totalCharacters = action.payLoad.input.split("").length;
            const totalWords = action.payLoad.input.split(" ").filter((data)=>{
                if(data !== ""){
                    return true;
                }
                return false;
            }).length;

            return{
                ...state,
                input_data: action.payLoad.input,
                total_characters : totalCharacters,
                total_words : totalWords,
                total_time_req_to_read : totalWords * 0.008
            }
        }
        case 'upperCase':
            return{
                ...state,
                input_data : state.input_data.toUpperCase()
            }
        case 'lowerCase':
            return{
                ...state,
                input_data : state.input_data.toLowerCase()
            }
        case 'clear':
            return{
                ...state,
                input_data : "",
                total_characters : 0,
                total_words : 0,
                total_time_req_to_read : 0
            }
        case 'trim':
            return{
                ...state,
                input_data : state.input_data.trim(),
                total_characters : state.input_data.trim().length
            }
        case 'theme':
            return{
                ...state,
                dark_mode : !state.dark_mode
            }
        default:
            return {...state}
    }
}

function LandingScreen(){

    const [state, dispatch] = useReducer(reducer, initialValue);

    function inputChangeHandler(e){
        dispatch({type:"change", payLoad : {input : e.target.value}});
    }

    function clickHandler(e){
        if(e.target.innerText === "Convert Uppercase"){
            dispatch({type: "upperCase"})
        } else if (e.target.innerText === "Convert Lowercase"){
            dispatch({type: "lowerCase"})
        } else if (e.target.innerText === "Clear Text"){
            dispatch({type:"clear"})
        } else if (e.target.innerText === "Copy To Clipboard"){
            navigator.clipboard.writeText(state.input_data)
        } else if (e.target.innerText==="Remove Extra Space"){
            dispatch({type:"trim"})
        }
    }

    function themeHandler(){
        dispatch({type:"theme"})
    }

    return(
        <div id='container' className={state.dark_mode && 'dark-mode'}>
            <div id='theme-cntrl'>
                <div id='toggle-conainer' onClick={themeHandler}>
                    <div id='toggle-switch' className={state.dark_mode ? 'toggle-switch-dark-mode' : "toggle-switch-light-mode"}></div>
                </div>
                <p>Enable {state.dark_mode ? "light" : "dark"} mode</p>
            </div>
            <header>
                <h1>TextUtis - Word Counter, Charecter Counter, Remove Extra Space</h1>
            </header>
            <div id='input-container'>
                <p>Enter Your Text Here:</p>
                <textarea value={state.input_data} onChange={inputChangeHandler}/>
                <div onClick={clickHandler} id='btn-container'>
                    <button className='case-change-btn'>Convert Uppercase</button>
                    <button className='case-change-btn'>Convert Lowercase</button>
                    <button className='clear-btn'>Clear Text</button>
                    <button className='copy-btn'>Copy To Clipboard</button>
                    <button className='remove-space-btn'>Remove Extra Space</button>
                </div>
            </div>
            <div>
                <h3>Summery Of Your Text</h3>
                <p>Nummber of words :{state.total_words} </p>
                <p>Number of charecters : {state.total_characters} </p>
                <p>Reading Time: {state.total_time_req_to_read} </p>
            </div>
            <div id='output-container'>
                <h3>Preview Document</h3>
                <textarea value={state.input_data} readOnly/>
            </div>
        </div>
    )
}

export default LandingScreen;