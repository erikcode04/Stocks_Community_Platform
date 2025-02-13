import React, {useState} from "react";
import axios from "axios";
import LineChart from "./LineChart";
import "./componentStyles/makePrediction.css"
import { FaCloudUploadAlt } from "react-icons/fa";



const MakePrediction =  () => {
 const [stockSymbol, setStockSymbol] = useState("");
 const [step, setStep] = useState(1);
 const [years, setYears] = useState({
    yearOne: { year: new Date().getFullYear(), price: 0 },
    yearTwo: { year: new Date().getFullYear() + 1, price: 0 },
    yearThree: { year: new Date().getFullYear() + 2, price: 0 },
    yearFour: { year: new Date().getFullYear() + 3, price: 0 }
});

const handleYearChange = (yearKey, field, value) => {
    setYears(prevYears => ({
        ...prevYears,
        [yearKey]: {
            ...prevYears[yearKey],
            [field]: value
        }
    }));
};

const updateYearOnePrice = (newPrice) => {
    setYears(prevYears => ({
        ...prevYears,
        yearOne: {
            ...prevYears.yearOne,
            price: newPrice
        }
    }));
};

async function submitPrediction(){
 console.log("we here", years)
 try {
    const response = await axios.post("http://localhost:5000/graph/uploadStockPrediction", { stockSymbol, years }, {withCredentials: true});
    console.log(response);
 } catch (error) {
    console.error(error);
 }
}
 

 async function getStockData(e) {
    e.preventDefault();
try {
    const response = await axios.get(`http://localhost:5000/graph/checkIfSymbolIsValid/${stockSymbol}`, {withCredentials: true});
    if (response.status === 200) {
        let startValue = response.data.price;
        startValue = Math.floor(startValue);
        updateYearOnePrice(startValue);  
        setStep(3);
    }
} catch (error) {
    console.error(error);
}
 }

return (
<div id="makePrediction-container">
{step === 1 && <div id="makePrediction-startOffContainer">
   <h2> Make a stock prediction </h2>
<button className="makePrediction-goNextButton" onClick={() => setStep(2)}> Lets go!!</button>
</div>
}
{step === 2 && <div id="makePrediction-secondStepContainer">
<button onClick={() => setStep(step -1)} className="makePrediction-goBackButton" > back</button>
  
       <h2> stock lowest value in a five years series</h2>
       <form onSubmit={getStockData} className="makePrediction-centreMainContent">
            <input 
                type="text" 
                placeholder="Enter the stock symbol" 
                value={stockSymbol} 
                onChange={(e) => setStockSymbol(e.target.value)} 
                className="makePrediction-input"
                required
            />
            <button className="makePrediction-goNextButton" type="submit">Next</button>
        </form>
</div>
}
{step === 3 && <div id="thirdStepOfMakingPrediction">
<button onClick={() => setStep(step -1)} className="makePrediction-goBackButton" > back</button>
    <h2> Enter the stock prices for the next five years </h2>
    <h3> {stockSymbol} price: {years.yearOne.price} </h3>
    <form className="makePrediction-centreMainContent" onSubmit={() => setStep(4)} >
            <input 
                type="number" 
                placeholder="Year 2" 
                value={years.yearTwo.price} 
                onChange={(e) => handleYearChange('yearTwo', 'price', e.target.value)} 
                 className="makePrediction-input"
            />
            <input 
                type="number" 
                placeholder="Year 3" 
                value={years.yearThree.price} 
                onChange={(e) => handleYearChange('yearThree', 'price', e.target.value)} 
                className="makePrediction-input"
            />
            <input 
                type="number" 
                placeholder="Price 4" 
                value={years.yearFour.price} 
                onChange={(e) => handleYearChange('yearFour', 'price', e.target.value)} 
                className="makePrediction-input"
            />
    <button className="makePrediction-goNextButton" type="submit" > Next </button>
    </form>

</div>
}
{step === 4 && <div id="fourthStepOfMakingPrediction">
<button onClick={() => setStep(step -1)} className="makePrediction-goBackButton" > back</button>
<LineChart years={years} />
<div id="makePrediction-submitButtonContainer">
    <button className="makePrediction-submitButton" onClick={submitPrediction} > <FaCloudUploadAlt size={30} />
 </button>
    </div>  
    </div>
}
</div>
)

}

export default MakePrediction;