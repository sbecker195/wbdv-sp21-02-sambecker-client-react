import React, {useState} from 'react'

const HeadingWidget = ({widget, updateWidget, deleteWidget}) => {
    const [editing, setEditing] = useState(false)
    const [cachedWidget, setCachedWidget] = useState(widget)
    return (
        <>
            {
            editing &&
                <div>
                    <i className="fas fa-check wbdv-save-btn float-right"
                        onClick={() => {
                            updateWidget(widget.id, cachedWidget)
                            setEditing(false)
                    }}></i>
                    <i className="fas fa-trash wbdv-delete-btn float-right"
                        onClick={() => {
                            deleteWidget(widget.id)
                            setEditing(false)
                    }}></i>
                    <select className="col-sm-10 form-control"
                            value ={cachedWidget.type}
                            onChange={(e) =>
                                setCachedWidget({
                                    ...cachedWidget,
                                    type: e.target.value
                                })}>
                        <option value={"HEADING"}>Heading</option>
                        <option value={"PARAGRAPH"}>Paragraph</option>
                        <option value={"VIDEO"}disabled>Video</option>
                        <option value={"IMAGE"}disabled>Image</option>
                        <option value={"LINK"}disabled>Link</option>
                        <option value={"LIST"}disabled>List</option>
                        <option value={"HTML"}disabled>HTML</option>
                    </select>
                    <br>
                    </br>
                    <input className="col-sm-10 form-control"
                            value={cachedWidget.text}
                            onChange={(e) =>
                               setCachedWidget({
                                   ...cachedWidget,
                                   text: e.target.value
                               })
                            }/>
                    <br>
                    </br>
                    <select className="col-sm-10 form-control"
                            value={cachedWidget.size}
                            onChange={(e) =>
                               setCachedWidget({
                                   ...cachedWidget,
                                   size: e.target.value
                               })
                            }>
                        <option value={1}>Heading 1</option>
                        <option value={2}>Heading 2</option>
                        <option value={3}>Heading 3</option>
                        <option value={4}>Heading 4</option>
                        <option value={5}>Heading 5</option>
                        <option value={6}>Heading 6</option>
                    </select>
                </div>
            }
            {
                !editing &&
                <div>
                    <i className="fas fa-cog float-right"
                        onClick={() => setEditing(true)}></i>
                    {widget.size == 1 && <h1>{widget.text}</h1>}
                    {widget.size == 2 && <h2>{widget.text}</h2>}
                    {widget.size == 3 && <h3>{widget.text}</h3>}
                    {widget.size == 4 && <h4>{widget.text}</h4>}
                    {widget.size == 5 && <h5>{widget.text}</h5>}
                    {widget.size == 6 && <h6>{widget.text}</h6>}
                </div>
            }
        </>
    )
}

export default HeadingWidget