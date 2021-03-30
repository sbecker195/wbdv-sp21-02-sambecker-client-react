import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
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
                            widget.type === "HEADING" &&
                            <HeadingWidget
                                updateWidget={updateWidget}
                                deleteWidget={deleteWidget}
                                widget={widget}/>
                        }
                        {
                            widget.type === "PARAGRAPH" &&
                            <ParagraphWidget
                                updateWidget={updateWidget}
                                deleteWidget={deleteWidget}
                                widget={widget}/>
                        }
                            widget.type === "LIST" &&
                            <ListWidget
                                updateWidget={updateWidget}
                                deleteWidget={deleteWidget}
                                widget={widget}/>
                        }
                            widget.type === "IMAGE" &&
                            <ImageWidget
                                updateWidget={updateWidget}
                                deleteWidget={deleteWidget}
                                widget={widget}/>
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
        const newWidget = {type: "HEADING", size: 1, text: "New Widget"};
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