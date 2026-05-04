import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { useEffect } from "react";
import { updatePack } from "../actions/packActions";
import { useDispatch } from "react-redux";
import { fetchCards } from "../actions/cardActions";

import "./study.css";
function Study() {
    const navigate = useNavigate();
    const selectedPack = useSelector((state) => state.pack && state.pack.selectedPack);
    const cards = useSelector((state) => state.cards && state.cards.cards);
    console.log('Study component rendered with selectedPack:', selectedPack); // Debugging log
    const dispatch = useDispatch();
    const highScore = selectedPack && (selectedPack.score || selectedPack.highScore || 0);
    console.log('where is','and ',cards); // Debugging log
    const [isFront, setFront] = React.useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState("next");
    const [finished, setFinished] = useState(false);
    const [correct, setCorrect] = useState(0);
    const cardClick = () => {
        setFront((prev) => !prev);
    }
    
    const correctCard = () => {
        if (!cards || cards.length === 0) return;
        setDirection("next");
        // if we are at last card, finish and show high score
        if (currentIndex >= cards.length - 1) {
            setFinished(true);
            setCorrect((prev) => prev + 1);
            setFront(true);
            updateHighScore();
            return;
        }
        setCurrentIndex((prev) => prev + 1);
        setCorrect((prev) => prev + 1);
        setFront(true);
    };

    const wrongCard = () => {
         if (!cards || cards.length === 0) return;
        setDirection("next");
        // if we are at last card, finish and show high score
        if (currentIndex >= cards.length - 1) {
            setFinished(true);
            setFront(true);
            updateHighScore();
            return;
        }
        setCurrentIndex((prev) => prev + 1);
        
        setFront(true);
    };

    
    const total = cards.length || 0;
    
    const percentage = total > 0 ? (correct / total) * 100 : 0;
   
    console.log('Study component score:', correct, "total:", total); // Debugging log
    const newHighScore =  Math.max(correct, highScore);
        console.log('Study component newHighScore:', newHighScore); // Debugging log
    const updateHighScore = () => {
        if (selectedPack) {
            console.log('Updating high score for pack:', selectedPack._id, 'Current high score:', highScore, 'New score:', newHighScore);
            const updatedPack = {
                packId: selectedPack._id,
                score: parseInt(newHighScore),
            };
            console.log('Updating pack with new high score:', updatedPack);
            dispatch(updatePack(selectedPack._id, updatedPack));
        }
    };
    return (
        <div style = {{ padding: '40px' }}>
            <h2 style={{ color: '#232f91', fontSize: '2rem' }}>Study Page</h2>
           
            <p  style = {{ marginBottom: '20px', color: '#555', display: 'flex', fontSize: '1.25rem' }}>Selected Pack: {selectedPack ? selectedPack.name : 'Loading...'}</p>
            <p style = {{ marginBottom: '20px', color: '#000', display: 'flex', fontSize: '1.25rem'  }}>High Score: {highScore}/{total}</p>

           
           <div className = "slider-container" style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            {cards && cards.length > 0 ? (
                <div className={`flip-card ${direction}`} onClick={cardClick} style = {{ width: '300px', height: '200px', cursor: 'pointer' }}>  
                    <div className={`flip-card-inner ${isFront ? 'flipped' : ''}`}>
                        <div className="flip-card-front">
                            <h3 style = {{ color: '#2c1368' }}>{cards[currentIndex].back}</h3>
                        </div>
                        <div className="flip-card-back">
                            <h3 style = {{ color: '#2c1368' }}>{cards[currentIndex].front}</h3>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No cards available in this pack.</p>
            )}
            </div>

            {finished ? (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <h3>Finished!</h3>
                    <p style={{ fontSize: '1.25rem' }}>Your score: {Math.round(percentage)}%</p>
                    <p style={{ fontSize: '1.1rem' }}>High Score: {Math.round((newHighScore / total) * 100)}%</p>
                    <div style={{ marginTop: 12 }}>
                        <Button onClick={() => { setFinished(false); setCurrentIndex(0); setFront(true); setCorrect(0); }} style={{ marginRight: 8 }}>Restart</Button>
                        <Button onClick={() => { updateHighScore(); navigate('/home'); }} style={{ marginRight: 8 }}>Back to Home</Button>
                    </div>
                </div>
            ) : (
                <div style = {{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button onClick={wrongCard} style={{ marginRight: '10px', height: '40px', width: '100px', cursor: 'pointer', color: '#fff', backgroundColor: '#3d49a9', borderRadius: '9px', border: 'none'  }}>
                        Wrong
                    </Button>
                    <Button onClick={correctCard} style={{ marginLeft: '10px', height: '40px', width: '100px', cursor: 'pointer', color: '#fff', backgroundColor: '#3d49a9', borderRadius: '9px', border: 'none'  }}>
                        Correct
                    </Button>
                </div>
            )}

        </div>
    );
}

export default Study;