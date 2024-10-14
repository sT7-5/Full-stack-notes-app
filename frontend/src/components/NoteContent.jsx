import '../styles/Home.css'



export default function NoteContent(props){

    const theDate = new Date().toLocaleDateString("en-Uk")





    return(

        <div >
            <p className="noteContent" >
                {props.content===''? '' : `Date created: ${theDate}`}
                <br></br>
                {props.content}
            </p>

        </div>
    )


}