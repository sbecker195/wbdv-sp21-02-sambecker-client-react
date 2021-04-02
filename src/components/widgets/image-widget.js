import React, {useState} from 'react'

const ImageWidget = ({widget, editing, cachedWidget, setWidget}) => {
    return (
        <div>
            {
                editing &&
                    <div>
                        Image URL
                        <input className="col-sm-10 form-control"
                                onChange={(e) => setWidget(widget => ({
                                ...widget,
                                src: e.target.value}))}
                               value={cachedWidget.src}/>
                        Image Width
                        <input className="col-sm-10 form-control"
                                onChange={(e) => setWidget(widget => ({
                                ...widget,
                                width: e.target.value
                                    }))
                                }
                               value={cachedWidget.width} />
                        Image Height
                        <input className="col-sm-10 form-control"
                                onChange={(e) => setWidget(widget => ({
                                ...widget,
                                height: e.target.value
                                    }))
                                }
                               value={cachedWidget.height} />
                    </div>
            }
            {
                !editing &&
                <img src={widget.src}
                    width={widget.width}
                    height={widget.height}/>
            }
        </div>
    )
}

export default ImageWidget