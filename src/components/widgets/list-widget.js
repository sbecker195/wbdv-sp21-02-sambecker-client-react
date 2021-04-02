import React, {useState} from 'react'


const ListWidget = ({widget, editing, cachedWidget, setWidget}) => {
    return (
            <>
                {
                editing &&
                    <div>
                        <input onChange={(e) => setWidget(widget => ({
                                ...widget,
                                isOrdered: e.target.checked}))
                                }
                               checked={cachedWidget.isOrdered}
                               type="checkbox"/>
                        Ordered
                        <br/>
                        List Items
                        <textarea className="col-sm-10 form-control"
                                    onChange={(e) => setWidget(widget => ({
                                        ...widget,
                                        text: e.target.value}))
                                        }
                                  value={cachedWidget.text}
                                  rows={5}>
                        </textarea>
                    </div>
                }
                {!
                    editing &&
                        <>
                            {
                                widget.isOrdered &&
                                <ol>
                                    {widget.text.split("\n").map((item) => {
                                        return (
                                            <li>
                                                {item}
                                            </li>
                                        )
                                    })}
                                </ol>
                            }
                            {
                                !widget.isOrdered &&
                                <ul>
                                    {widget.text.split("\n").map((item) => {
                                        return (
                                            <li>
                                                {item}
                                            </li>
                                        )
                                    })}
                                </ul>
                            }
                        </>
                }
            </>
    )}

export default ListWidget