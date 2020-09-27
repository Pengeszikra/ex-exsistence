# Ex-Exsistence
React Game under 2h

Yesterday I was waiting for my wife in car, and my Mac charged around: 80%. So I started discovering [react-beautiful-dnd](https://codesandbox.io/s/k260nyxq9v).
My first plan is converting that tutorial to hooks.

When I reached point to fill item list, suddenly click emoji on touch bar, and write this:

```jsx
const [items, editItems] = useState([
  {id: 0, content: '👧🏼 Girl' },
  {id: 1, content: '🥶 Cold' },
  {id: 2, content: '🧚🏼‍♀️ Faerie' },
  {id: 3, content: '🐨 Coala' },
]);
```

Which seems wrong in [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) because id need to be: **string**.

After figure out this problem, and drag and drop list is worked, my next idea - give score to item - lead to this experimental coding turn to game development.

the basic *interaction* between items seems:
```jsx
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) return;
    const dragged = result.source.index;
    const target = result.destination.index;
    editItems(list => {
      const dif = list[dragged].score - list[target].score;      
      list[dragged].score += 10 * (dragged - target) + dif;
      list[target].score += 10 * (target - dragged) - dif;
      const [removed] = list.splice(dragged, 1);
      list.splice(target, 0, removed);
      return list;
  }
``` 

After this step, I realised, loser score asap going below zero, so if someone score going down turn to zombie.

```jsx
 {id, content: '🧟 zombie', score: 0}
```




