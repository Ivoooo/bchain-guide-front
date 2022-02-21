
//todo decide on ATextArea vs BTextArea
export function ATextArea(txt="Bitte erläutern Sie ihre Antwort.") {
    return (
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"
                  placeholder={txt}/>
    )
}