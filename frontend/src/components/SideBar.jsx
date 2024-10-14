import '../styles/Home.css'

export default function SideBar(props) {
    const noteTitles = props.notes.map((note) => {
        return (
            <div 
            key={note.id} 
            className={props.currentNote.id===note.id? "currentNote" : "noteSidebar"} 
            onClick={() => props.changeCurrentNote(note.id)}>

                {note.title} 
            </div>
        );
    });

    return (
        <div>
            <p className='notesHeader'>{props.notes.length > 0 ? "Notes: " : ""}</p>
            {noteTitles}  
        </div>
    );
}
