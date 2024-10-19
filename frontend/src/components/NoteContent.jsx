import '../styles/Home.css'



export default function NoteContent(props){






    return(

        <div >
            <p className="noteContent" >
                <br></br>
                {props.content}
            </p>

        </div>
    )


}
