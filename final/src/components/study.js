import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
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
    
    const cardClick = () => {
        setFront((prev) => !prev);
    }
    

    const correct = 0
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
        <div>
            <h2>Study Page</h2>
            <p>Study your flashcards here!</p>
            <p>Selected Pack: {selectedPack ? selectedPack.name : 'Loading...'}</p>
            <p>High Score: {highScore}/{total}</p>

            <div>
                {cards && cards.length > 0 ? (
                    cards.map((card, index) => (
                        <div classname="flip-card" key={card._id} onClick={cardClick} style = {{ width: '50%', margin: '20px auto', padding: '20px', borderRadius: '10px', backgroundColor: '#e1c0f1d2', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                            <div className={`flip-card-inner ${isFront ? '' : 'flipped'}`} style = {{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', color: '#2c1368' }}
                                    >
                                <div className="flip-card-front" style = {{ position: 'absolute', backfaceVisibility: 'hidden' }}>
                                    {card.front}
                                </div>  
                                <div className="flip-card-back" style = {{ position: 'absolute', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                    {card.back}
                                </div>
                            </div>    
                        </div>

                    ))
                ) : (
                    <p>No cards available in this pack.</p>

                )}
            </div>
            <Button onClick={() => navigate('/home')} style = {{ marginTop: '20px', height: '40px', width: '200px', color: '#fff', cursor: 'pointer' ,backgroundColor: '#6e50c2', borderRadius: '9px', border: 'none' }}>
                Go to Home
            </Button>
        </div>
    );
}

export default Study;