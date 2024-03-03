import React, { useContext, useEffect,useState,useRef } from 'react'
import Noteitem from './Noteitem';
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
        //eslint-disable-next-line
    }, [])
    const [note, setnote] = useState({id: 0,edittitle:"",editdescription:"",edittag:""})
    const updateNote = (currentNote)=>{
        ref.current.click();
        setnote({id:currentNote._id,edittitle : currentNote.title,editdescription : currentNote.description,edittag : currentNote.tag})
    }
    const handleClick =(e)=>{
        editNote(note.id,note.edittitle,note.editdescription,note.edittag);
        refClose.current.click();
        props.displayAlert("Note Updated Successfully","success");
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    const ref = useRef('');
    const refClose = useRef('');
    return (
        <>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <div className="mb-3">
                                    <label htmlFor="edittitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="edittitle" placeholder="Enter your title here" name="edittitle" value={note.edittitle} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="editdescription" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="editdescription" name="editdescription" rows="3" value={note.editdescription} onChange={onChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edittag" className="form-label">Tag</label>
                                    <textarea type="text" className="form-control" id="edittag" name="edittag" rows="3" placeholder="general" value={note.edittag} onChange={onChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button className="btn btn-primary" disabled={note.edittitle.length<5 || note.editdescription.length<5} onClick={handleClick}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <Addnote displayAlert={props.displayAlert}/>
            <div className="row container">
                <h2 className="text-center mb-3">Your Notes</h2>
                {notes.length!==0?notes.map((note, index) => {
                    return <Noteitem key={index} updateNote={updateNote} displayAlert={props.displayAlert} note={note} />
                }).reverse():<p className='container text-center'>No Notes to display</p>}
            </div>
        </>
    )
}

export default Notes