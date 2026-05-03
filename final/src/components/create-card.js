import react from 'react';
import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { newCard } from '../actions/cardActions';
import { useDispatch } from 'react-redux';

function CreateCard() {
    const nav = useNavigate();  
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');  
    const { packId: routePackId } = useParams(); 
    const dispatch = useDispatch();
   
    const handleCreateCard = () => {
        // Here you would typically dispatch an action to create the card in the backend
        console.log('Creating card with question:', question, 'and answer:', answer, 'for pack ID:', routePackId);
        const newCardData = {
            front: question,
            back: answer,
            PackId: routePackId // You would need to set this to the current pack's ID
        };
        dispatch(newCard(newCardData));
        nav(`/packs/${routePackId}`); // Navigate back to the pack page after creating the card
    }

    return (
        <div className="home-container" style = {{ paddingLeft: '40px' , justifyContent: 'center', paddingRight: '40px' }}>
            <h1 className="text-center mb-4" style = {{ color: '#232f91', fontSize: '2rem', paddingLeft: '43%' }}>Create a New Card</h1>
           <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <card style={{ width: '30%', justifyContent: 'center', marginBottom: "20px", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border : '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
                    <div style= {{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
                    <p style={{ marginBottom: '20px', color: '#555', display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>Enter the title and description for your new pack below.</p>
                <label htmlFor="cardQuestion" style={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', justifyContent: 'left' }}>Card Question:</label>
                    
                <input  
                    type="text"
                    className="form-control"
                    id="cardQuestion"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter card question"
                    style = {{ width: '80%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
                    
                />
           
            <label htmlFor="cardAnswer" style={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', justifyContent: 'left' }}>Card Answer:</label>
                    
                <input
                    type="text"
                    className="form-control"
                    id="cardAnswer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter card answer"
                    style = {{ width: '80%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            
            <button className="btn btn-primary" onClick={handleCreateCard} style = {{ marginTop: '10px', cursor: 'pointer', height: '40px', width: '200px', color: '#fff', backgroundColor: '#3d49a9', borderRadius: '9px', border: 'none'  }}>
                Create Card
            </button>
            </div>
            </card>
        </div>


        
        <Button className="mt-3" variant="secondary" onClick={() => nav('/home')} style= {{justifyContent: 'center', marginLeft: '47%' }}>Back to Home</Button>
                      
                    
            </div>
        
        
    );
}

export default CreateCard;