import React from "react"
import api from "../api"
import '../styles/Home.css'
import Split from 'react-split'
import SideBar from "../components/SideBar";
import NoteContent from "../components/NoteContent";
import LogoutRegisterButton from "../components/LogoutRegisterButton"



export default function Home(){

    const [notes, changeNotes] = React.useState([]);
    const [content, setContent] = React.useState('');
    const[title, setTitle] = React.useState('');
    const[currentNote, setCurrentNote] = React.useState('')


    

    React.useEffect(() =>{
        getNotes();
    }, [])

    function getNotes(){
        api.get('/api/notes/')
            .then((res) =>  res.data)
            .then((data) => {changeNotes(data); console.log(data);})
            .catch(error => window.alert(error))
    }

    function deleteNote(id){
        api.delete(`/api/notes/delete/${id}/`)
            .then(res =>{
                if(res.status===204){//successful delete
                    alert("note was deleted")
                } else{
                    alert('failed to delete the note')
                }
                getNotes() //if we deleted note, we need to update the notes seen on screen
                
                setCurrentNote(null)
                

            })
            .catch(error => alert(error))
    }


    function createNote(e){
        e.preventDefault()
        api.post('/api/notes/', {content, title})
            .then(res => {
                if(res.status===201){//successful create
                    console.log(res.data.id)
                    alert("note created")
                } else{
                    alert('failed to create note')
                }
                getNotes()
                setCurrentNote(res.data)
    


            })
            .catch(err => alert(err))
    }

    function changeCurrentNote(id){//makes the note we click on, thee current note
        setCurrentNote(notes.find(note => note.id === id))
    }


  


    return(
        <div className="splitContainer">
            <Split 
                sizes={[30, 70]}
                direction="horizontal"
                className="split"
                gutterSize={7}
        
                
            >
                <div className="leftBar">
                    <LogoutRegisterButton 
                        type="logout"
                        url="/logout"
                    />

                    <h2>Create Note</h2>
                    <form onSubmit={createNote}>
                        <label htmlFor="title">Title:</label>
                        <br />
                        <input 
                            type='text' 
                            id='title' 
                            name='title' 
                            required 
                            onChange={(e) => setTitle(e.target.value)} 
                            value={title}
                        />

                        <label htmlFor="content">Content:</label>
                        <br />
                        <textarea 
                            type='text' 
                            id='content' 
                            name='content' 
                            required 
                            onChange={(e) => setContent(e.target.value)} 
                            value={content}
                        ></textarea>
                        <br />
                        <input type='submit' value='submit'></input>
                        
                    </form>

                    <SideBar
                        notes={notes}
                        currentNote={currentNote ? currentNote :'' }
                        changeCurrentNote={changeCurrentNote}
                    />

                </div>

                
                <div className="noteSection">
                    <h2>Current Note:</h2>




                    <NoteContent 
                        content={currentNote ? currentNote.content : ''}
                    />
                    {currentNote ? <button className="deleteButton" onClick={() => deleteNote(currentNote.id)}>Click to delete note</button> : <p>You have no notes or are not selecting a note</p> }


                </div>
                




            </Split>
        </div>

    )
}