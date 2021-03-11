import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const EditableItem = ({
                        to,
                        deleteItem,
                        updateItem,
                        item = {title: 'Some Title', _id: 'ABC'},
                        highlight,
                        active
                      }) => {
  const [editing, setEditing] = useState(false);
  const [cachedItem, setCachedItem] = useState(item);
  return (
    <div>
      {
        !editing &&
        <span className={`nav-link ${active ? 'active':''}`}>
          <Link className={`${highlight}`} to={to}>
            {item.title}
          </Link>
          <i className='float-right btn fas fa-edit'
            onClick={() => setEditing(true)}/>
        </span>
      }
      {
        editing &&
        <div className={`nav-link ${active ? 'active':''}`}>
          <input
              onChange={(e) =>
                setCachedItem({
                  ...cachedItem,
                  title: e.target.value
                })}
              value={cachedItem.title}/>
          <div className='float-right'>
            <i className='fas fa-times wbdv-clickable wbdv-delete-btn'
                         onClick={() => {
                           setEditing(false)
                           deleteItem(item)
               }}/>
            <i className='fas fa-check wbdv-clickable wbdv-save-btn'
                         onClick={() => {
                           setEditing(false)
                           updateItem(cachedItem)
               }}/>
          </div>
        </div>
      }
    </div>
  )
}

export default EditableItem