import react from 'react';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, form } from 'react-bootstrap';
import { createPack } from '../actions/packActions';
import { useDispatch } from 'react-redux';

function CreatePack() {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreatePack = () => {
        const newPack = {
            name: title || 'Untitled Pack',
            description: description || 'No description provided'
        };
        dispatch(createPack(newPack));
        nav('/home');
    };

    return (
        <div className="home-container" style = {{ paddingLeft: '40px' , justifyContent: 'center', paddingRight: '40px' }}>
            <h1 className="text-center mb-4" style = {{ color: '#232f91', fontSize: '2rem', paddingLeft: '43%' }}>Create a New Pack</h1>
            
                <div style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <card style={{ width: '30%', justifyContent: 'center', marginBottom: "20px", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border : '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
                    <div style= {{padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
                    <p style={{ marginBottom: '20px', color: '#555', display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>Enter the title and description for your new pack below.</p>
                    
                    <label htmlFor="packTitle" style={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', justifyContent: 'left' }}>Pack Title:</label>
                    <input 
                        id="packTitle"
                        type="text"
                        placeholder="Pack Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style = {{ width: '80%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <label htmlFor="packDescription" style={{ fontWeight: 'bold', marginBottom: '10px', display: 'flex', justifyContent: 'left' }}>Pack Description:</label>
                    <input
                        id="packDescription"
                        type="text"
                        placeholder="Pack Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style = {{ width: '80%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button className="btn btn-primary" onClick={handleCreatePack} style = {{  marginTop: '10px', cursor: 'pointer', height: '40px', width: '200px', color: '#fff', backgroundColor: '#3d49a9', borderRadius: '9px', border: 'none' }}>
                        Create Pack 
                    </button>
                    </div>
                    </card>
                </div>
         

                <Button className="mt-3" variant="secondary" onClick={() => nav('/home')} style= {{justifyContent: 'center', marginLeft: '47%' }}>Back to Home</Button>
              
            
        </div>
    );
}

export default CreatePack;