import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* import pages : S */
import BoardList from 'board/BoardList';
import Write from 'board/Write';

/* import pages : E */

function App() {
  return (
    <div className="App">
      <BoardList></BoardList>
      <Write></Write>
    </div>
  );
}
export default App;