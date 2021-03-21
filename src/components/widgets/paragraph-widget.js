import React, {useState} from 'react'

const ParagraphWidget = ({widget, updateWidget, deleteWidget}) => {
    const [editing, setEditing] = useState(false)
    const [cachedWidget, setCachedWidget] = useState(widget)
    return (
        <>
            {
                editing &&
                <>
                    <i className="fas fa-check wbdv-save-btn float-right"
                       onClick={() => {
                        updateWidget(widget.id, cachedWidget)
                        setEditing(false)
                        }
                    }></i>
                    <i className="fas fa-trash wbdv-delete-btn float-right"
                       onClick={() => {
                        deleteWidget(widget.id)
                        setEditing(false)
                        }
                    }></i>
                    <select className="col-sm-10 form-control"
                            value ={cachedWidget.type}
                            onChange={(e) =>
                                setCachedWidget({
                                    ...cachedWidget,
                                    type: e.target.value
                                })
                            }>
                        <option value={"HEADING"}disabled>Heading</option>
                        <option value={"PARAGRAPH"}disabled>Paragraph</option>
                        <option value={"VIDEO"}disabled>Video</option>
                        <option value={"IMAGE"}disabled>Image</option>
                        <option value={"LINK"}disabled>Link</option>
                        <option value={"LIST"}disabled>List</option>
                        <option value={"HTML"}disabled>HTML</option>
                    </select>
                    <br>
                    </br>
                    <textarea
                        className="col-sm-10 form-control"
                        value={cachedWidget.text}
                        onChange={(e) =>
                            setCachedWidget({
                                ...cachedWidget,
                                text: e.target.value
                            })
                        }
                    ></textarea>
                </>
            }
            {
                !editing &&
                <p>
                    <i className="fas fa-cog float-right"
                       onClick={() => setEditing(true)}>
                    </i>
                    {cachedWidget.text}
                </p>
            }
        </>
    )
}

export default ParagraphWidget