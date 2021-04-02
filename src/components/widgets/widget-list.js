import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import ImageWidget from "./image-widget";
import ListWidget from "./list-widget";
import {useParams} from "react-router-dom";
import widgetService from '../../services/widget-service';
import {connect} from 'react-redux'

const WidgetList = (
    {
        widgets = [],
        createWidget,
        findWidgetsForTopic,
        findAllWidgets,
        updateWidget,
        deleteWidget
    }

) => {
    const {topicId} = useParams();
    const [cachedWidget, setCachedWidget] = useState({});
    // console.log(topicId);
    useEffect(() => {
        findWidgetsForTopic(topicId)
    }, [topicId])

    return (
        <div>
            <i onClick={() => createWidget(topicId)} className="fas fa-plus fa-2x wbdv-add float-right"></i>
            <ul className="list-group">
                {
                    widgets.map(widget =>
                    <li className="list-group-item" key={widget.id}>
                        {
                            widget.id  !== cachedWidget.id &&
                            <i className="fas fa-cog float-right"
                                onClick={() =>
                                    setCachedWidget(widget)}></i>
                        }
                        {
                            widget.id === cachedWidget.id &&
                            <>
                                <i className="fas fa-check wbdv-save-btn float-right"
                                    onClick={() => {
                                    updateWidget(widget.id, cachedWidget)
                                    setCachedWidget({})
                                        }
                                    }></i>
                                <i className="fas fa-trash wbdv-delete-btn float-right"
                                    onClick={() => deleteWidget(widget.id)
                                    }></i>
                                <select className="col-sm-10 form-control"
                                        value={cachedWidget.type}
                                        onChange={(e) => {
                                        setCachedWidget(widget => ({
                                            ...widget,
                                            type: e.target.value}
                                            ))
                                        widget.type = e.target.value}
                                        }
                                    >
                                    <option value={"HEADING"}>Heading</option>
                                    <option value={"PARAGRAPH"}>Paragraph</option>
                                    <option value={"LIST"}>List</option>
                                    <option value={"IMAGE"}>Image</option>
                                    <option value={"VIDEO"}disabled>Video</option>
                                    <option value={"LINK"}disabled>Link</option>
                                    <option value={"HTML"}disabled>HTML</option>
                                </select>
                            </>
                        }
                        {
                            widget.type === "HEADING" &&
                            <HeadingWidget
                                widget={widget}/>
                                editing={widget.id === cachedWidget.id}
                                cachedWidget={cachedWidget}
                                setWidget={setCachedWidget}
                        }
                        {
                            widget.type === "PARAGRAPH" &&
                            <ParagraphWidget
                                widget={widget}/>
                                editing={widget.id === cachedWidget.id}
                                cachedWidget={cachedWidget}
                                setWidget={setCachedWidget}
                        }
                        {
                            widget.type === "LIST" &&
                            <ListWidget
                                widget={widget}/>
                                editing={widget.id === cachedWidget.id}
                                cachedWidget={cachedWidget}
                                setWidget={setCachedWidget}
                        }
                        {
                            widget.type === "IMAGE" &&
                            <ImageWidget
                                widget={widget}/>
                                editing={widget.id === cachedWidget.id}
                                cachedWidget={cachedWidget}
                                setWidget={setCachedWidget}
                        }
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

const stpm = (state) => ({
        widgets: state.widgetReducer.widgets
})

const dtpm = (dispatch) => ({
    createWidget: (topicId) => {
        const newWidget = {type: "HEADING", size: 1, text: "New Widget", height: 0, width: 0,
            url: '', isOrdered: false};
        widgetService.createWidget(topicId, newWidget)
            .then(widget => dispatch({
                type: "CREATE_WIDGET",
                widget: widget
            }))
    },
    findWidgetsForTopic: (topicId) => {
        widgetService.findWidgetsForTopic(topicId)
            .then(theWidgets => dispatch({
                type: "FIND_ALL_WIDGETS_FOR_TOPIC",
                widgets: theWidgets
            }))
    },
    findAllWidgets: () => {
        widgetService.findAllWidgets()
            .then(widgets => dispatch({
                type: "FIND_ALL_WIDGETS",
                widgets: widgets
            }))
    },
    updateWidget: (widgetId, widgetToUpdate) => {
        widgetService.updateWidget(widgetId, widgetToUpdate)
            .then(widget => dispatch({
                id: widgetId,
                type: "UPDATE_WIDGET",
                widget: widgetToUpdate,
            }))
    },
    deleteWidget: (widget) => {
        widgetService.deleteWidget(widget)
            .then(status => dispatch({
                type: 'DELETE_WIDGET',
                widgetToDelete: widget
            }))
    }
})

export default connect(stpm, dtpm)(WidgetList)