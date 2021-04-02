import React, {useState} from 'react'

const ParagraphWidget = ({widget, editing, cachedWidget, setWidget}) => {
    return (
        <div>
            {
                editing &&
                <div>
                    <br/>
                    <textarea className="col-sm-10 form-control"
                        onChange={(e) => setWidget({
                            ...widget,
                            text: e.target.value})
                        }
                        value={cachedWidget.text}></textarea>
                </div>
            }
            {
                !editing &&
                <p>
                    {widget.text}
                </p>
            }
        </div>
    )
}

export default ParagraphWidget