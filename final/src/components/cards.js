import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCards, deleteCard, newCard } from '../actions/cardActions';
import { Button } from 'react-bootstrap';

function Cards() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedPack = useSelector((state) => state.pack && state.pack.selectedPack);
    const highScore = selectedPack && (selectedPack.score || selectedPack.highScore || 0);
    const { packId: routePackId } = useParams();
    console.log('Cards component rendered with routePackId:', routePackId); // Debugging log
    console.log('card high score', highScore);
    const cards = useSelector((state) => state.cards && state.cards.cards);

    const packId = routePackId || (selectedPack && selectedPack._id);
     console.log(packId);
    const confirmDelete = (cardId) => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            dispatch(deleteCard(cardId));
        }
    }
    useEffect(() => {
        if (packId) dispatch(fetchCards(packId));
    }, [dispatch, packId]);
    const handleCreateCard = (packId) => {
        navigate(`/packs/${packId}/create-card`);
    }

    console.log('Cards in Cards component — packId:', packId, 'selectedPack:', selectedPack, 'cards:', cards);

    return (
        <div style = {{ padding: '40px' }}>
            {cards && cards.length ? (
                <div>
                    <h2 style = {{ color: '#232f91', fontSize: '2rem' }}>Cards in Pack: {selectedPack ? selectedPack.name : 'Loading...'}</h2>
                    <p style={{ marginBottom: '20px', color: '#555', display: 'flex' }}>Here are the cards in this pack. You can add new cards or delete existing ones.</p>
                    <p style = {{ color: '#555', fontSize: '1.2rem' }}>High Score: {highScore !== undefined&& highScore <=cards.length && highScore !== null ? Number(highScore).toFixed(0) : 'N/A'}/{cards.length}  </p>
                    <Button onClick={() => navigate(`/packs/${packId}/study-mode`)} style={{ height: '40px', width: '200px',cursor: 'pointer', color: '#fff', backgroundColor: '#3d49a9', borderRadius: '9px', border: 'none'  }}>

                        Study Mode
                    </Button>
                    <div style={{ height: '20px' }}></div>
                   
                    <div>
                    <table className="table table-striped card-table" style = {{ width: '100%',background: '#f9f9f9', padding: '20px', color: '#2c1368', border: '1px solid #ddd', borderRadius: '8px' }}>
                        
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Answer</th>
                            </tr>
                        </thead>
                        <tbody style = {{ color: '#2c1368', border: '1px solid #5b2c2c', borderRadius: '8px' }}>
                            {cards.map((card) => (
                                
                                <tr style = {{background: '#ffffff', height: '50px' }} key={card._id}>
                                    <td style = {{borderRight: '1px solid #ffffff', borderleft: '1px solid #ffffff'}}>{card.front}</td>
                                    <td style ={{borderRight: '1px solid #ffffff', borderleft: '1px solid #ffffff'}}>{card.back}</td>  
                                    <td style = {{width: '100px', borderRight: '1px solid #ffffff', borderleft: '1px solid #ffffff',   alignItems: 'right' }}>
                                        <button className="btn btn-danger" style = {{ background: 'transparent', border: 'transparent', cursor: 'pointer', width: '100%',  }} onClick={() => confirmDelete(card._id)}>
                                            Delete Card
                                        </button>
                                    </td>
                                </tr>
                            
                            ))}
                        </tbody>
                    </table>
                    </div>       
                    
                </div>
            ) : (
                <div>Cards coming soon!</div>
            )}
            <button className="btn btn-success mb-3" onClick={() => handleCreateCard(packId)} style = {{ marginTop: '20px', height: '40px', width: '200px',cursor: 'pointer', color: '#fff', backgroundColor: '#9c50c2', borderRadius: '9px', border: 'none' }}>
                        Add New Card
                    </button>
            
            <Button onClick={() => navigate('/home')} style = {{ marginLeft: '20px', marginTop: '20px', height: '40px', width: '200px', color: '#fff', cursor: 'pointer' ,backgroundColor: '#6e50c2', borderRadius: '9px', border: 'none' }}>Go to Home</Button>
        </div>
    );
}

export default Cards;