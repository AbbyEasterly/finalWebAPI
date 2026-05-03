// ...existing code...
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPacks, setPacks, deletePack as deletePackAction} from "../actions/packActions";
import { Link, useNavigate } from 'react-router-dom';
import { Image, Nav, Carousel } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
// ...existing code...

function Home() {
    const dispatch = useDispatch();
    const packs = useSelector((state) => state.pack && state.pack.packs);

    useEffect(() => {
        dispatch(fetchPacks());
    }, [dispatch]);

    console.log('Home packs:', packs);

    const nav = useNavigate();
    const viewPack = (packId) => {
        nav(`/packs/${packId}`);
    }

    const confirmDelete = (packId) => {
        if (window.confirm('Are you sure you want to delete this pack?')) {
            dispatch(deletePackAction(packId));
        }
    }

    return (

        <div className="home-container" style = {{ paddingLeft: 40, paddingRight: 40, maxHeight: '100vh' }}>
            <h1 className="text-center" style={{ color: '#2c1368', fontSize: '3rem' }}>Welcome to Flashcards!</h1>
            <h2 className="mb-3" style= {{ color: '#232f91', fontSize: '2rem'}}>Your Packs</h2>
            <p style= {{ color: '#000000', fontSize: '1rem', marginBottom: '20px', marginTop: '-15px'  }}>Click on a pack to view its cards or create a new pack to get started!</p>
            <button className="btn btn-success mb-4" onClick={() => nav('/create-pack')} style = {{cursor: 'pointer', height: '40px', width: '200px', color: '#fff', backgroundColor: '#3d49a9', borderRadius: '9px', border: 'none' }}>Create New Pack</button>

            {packs && packs.length > 0 ? (
                    <div className="container">
                      <div className="row" style = {{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {packs.map((pack) => (
                            <div key={pack._id} className="col-12 col-sm-6 col-md-4 mb-3" style = {{ padding: 20, display: 'flex', margin: 20, width: '300px', height: '300px' }}>
                            <div className="card" style = {{ width: '90%', backgroundColor: '#e1c0f1d2', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div className="card-body" style = {{   display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}  >
                                    <h5 style = {{ display: 'flex', justifyContent: 'center', fontSize: '1.5rem', color: '#2c1368' }} className="card-title">
                                        <Nav.Link onClick={() => viewPack(pack._id)} style={{ cursor: 'pointer', color: '#2c1368', backdropFilter: 'blur(10px)' }} className="card-title">{pack.name}</Nav.Link>
                                    </h5>
                                    <p className="card-text" style = {{ color: '#2c1368', borderLeft: '3px solid #2c1368', paddingLeft: '10px', marginBottom: '50px' }}>{pack.description}</p> 
                                    
                                    
                                        <button onClick={() => confirmDelete(pack._id)} style={{cursor: 'pointer', backgroundColor: 'transparent', border: 'none', color: '#2c1368', textDecoration: 'underline', fontSize: '12px', marginTop: 'auto', marginBottom: '10px' }}>Delete Pack</button>
                                </div>
                            </div>
                        </div>
                        ))}
                      </div>
                    </div>
            ) : (
                <p>No featured packs available.</p>
            )}

        </div>
    );
}


export default Home;
// ...existing code...