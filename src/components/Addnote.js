import React,{useState,useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setnote] = useState({title:"",description:"",tag:""})

    const handleClick = ()=>{
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description:"",tag:""})
        props.displayAlert("Note Added Successfully","success");
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container my-3">
            <h2 className='my-2 text-center'>Add Note</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" placeholder="Enter your title here" name="title" onChange={onChange} value={note.title} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea type="text" className="form-control" id="description" name="description" rows="3" onChange={onChange} value={note.description} placeholder="Enter the description here" required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <textarea type="text" className="form-control" id="tag" name="tag" rows="3" placeholder="general" onChange={onChange} value={note.tag} required></textarea>
            </div>
            <button className="btn btn-primary" disabled={note.title.length<5||note.description.length<5} onClick={handleClick}>Add Note</button>
        </div>
    )
}

export default Addnote