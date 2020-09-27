import React, {useState} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// copy and paste https://codesandbox.io/s/k260nyxq9v and reworked
const DragExample = ({items, onDragEnd, getListStyle, getItemStyle}) => (
  <DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId="droppable">
    {(provided, snapshot) => (
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
      >
        {items.map(({id, content, score}, index) => (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                {content} : {score}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>
);

export default function DragAndDropListCase () {

  const [items, editItems] = useState([
    {id: '👧🏼', content: '👧🏼 Girl  ', score: 500},
    {id: '🥶', content: '🥶 Cold  ', score: 500},
    {id: '🧚🏼‍♀️', content: '🧚🏼‍♀️ Faerie', score: 500},
    {id: '🐨', content: '🐨 Coala ', score: 500},
    {id: '🐼', content: '🐼 Panda ', score: 500},
    {id: '👨🏽‍🦳', content: '👨🏽‍🦳 Oldman', score: 500},
    {id: '🧝🏾‍♀️', content: '🧝🏾‍♀️ Elf   ', score: 500},
    {id: '🐉', content: '🐉 Dragon', score: 500},
  ]);

  const [round, countRound] = useState(0);

  const itemStyle = {
    userSelect: "none",
    width: 300,
    background: "#456",
    fontSize: 34,
  }

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) return;
    const winer = result.source.index;
    const loser = result.destination.index;
    editItems(list => {
      const dif = list[winer].score - list[loser].score;      
      list[winer].score += (list[loser].score > 0)
        ? 10 * (winer - loser) + dif
        : - Math.random() * list[winer].score | 0
      list[loser].score += 10 * (loser - winer) - dif;
      const [removed] = list.splice(winer, 1);
      list.splice(loser, 0, removed);
      const result = list.map(({score, content, id}) => 
        score > 0 
          ? {score, id, content} 
          : {score: 0, id, content: '🧟 zombie'}
      );
      countRound(r=>r+1);
      return result.map(({score, content, id}) => 
        content === '🧟 zombie' && score > 0 
          ? {score, id, content:`🧟 of ${id}`}
          : {score, id, content}
      ); 
    })
  };

  const countOfExExsistence = () => items.filter(({id, content}) => content.includes(' of'));

  const isOver = countOfExExsistence().length >= items.length;
  const score = items.reduce((c, {score}) => c + score, 0);

  return (
    <pre style={{color:'#FFF', fontSize:18, userSelect: "none", width: 700, whiteSpace:'pre-wrap', wordWrap:'break-word', background:'#564', margin:'20px auto'}}>{`
              -- - [ Drag and drop adventuere ] - --

        ${'-'.repeat(49)}
        this concept build for reveal simplicity of react
        ${'-'.repeat(49)}`}
    {isOver && <h1 style={{margin:'0 auto', width:400}}>Game Over 
    score: {score} / {round} = {score / round | 0}</h1>}
     <div style={{position:'relative', width: 440, margin:'20px auto 120px', background:'rgba(0,0,0,.2)', padding:'1em', fontSize: 34}}>
        <DragExample
          items={items} 
          onDragEnd = {onDragEnd}
          getListStyle = {(isDraggingOver) => ({background: isDraggingOver ? "rgba(0,0,0,.2)" : "transparent"})}
          getItemStyle = {(isDragging, draggableStyle) => ({itemStyle, background: isDragging ? "#000" : "transparent", ...draggableStyle})}
        />
        <pre style={{position:'absolute', background:'#222', width:'100%', fontSize: 28, color:"#FED", bottom:-150, left:0, textAlign:'center'}}>
          <p>ex-exsistence: [{countOfExExsistence().length}]</p>
          <p>round: [{round}]</p>
        </pre>
      </div>
      {`
    live score system, if someone change position to 
    another one, that is means win over that player

    - if some one run out of score then turn to (🧟) zombie
    - if zombie some how gain score return to ex exsistence
    Your goal is every one is reach ex exsistence status.

    `}

    <pre style={{color:'#ABC', marginTop:-20, background:'#000'}}>{`
      // score calculation:

      const dif = list[winer].score - list[loser].score;      
      list[winer].score += (list[loser].score > 0)
        ? 10 * (winer - loser) + dif
        : - Math.random() * list[winer].score | 0
      list[loser].score += 10 * (loser - winer) - dif;
    `}</pre>
        <a style={{color:'#FFF', padding:'3em'}} href="https://codesandbox.io/s/k260nyxq9v">{'< '}based on react-beautiful-dnd example{' >'}</a>        
        {`
        `}
     </pre>
  );
}