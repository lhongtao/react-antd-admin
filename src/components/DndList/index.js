import React from 'react'
import { Card, Icon, Divider  } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (count) => Array.from({length: count}, (v, k) => k).map(k => ({
  id: `item-${k}`,
  content: `item ${k}`
}));

// a little function to help us with reordering the result
const reorder =  (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});

class DndList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10)
    }
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd (result) {
    // dropped outside the list
    if(!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  render() {
    return (
      <div style={{ padding: 24 }}>
        <Card bordered={false}>
          <h3>react-beautiful-dnd.</h3>
          <Divider>列表拖拽</Divider>
          <div className="dnd-wrapper">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div>
                            <div
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              style={getItemStyle(
                                provided.draggableProps.style,
                                snapshot.isDragging
                              )}
                            >
                              {item.content}
                            </div>
                            {provided.placeholder}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </Card>
      </div>
    )
  }
}

export default DndList
