import './App.css';
import { AppHeader } from './App/header';
import AsyncWordleAutocomplete from './App/components/AsyncWordleAutocomplete';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="App-content">
        <p>Hello and welcome to the wordle search!</p>
        <p>The goal of this app is to allow you to search through the list of already found wordle words.</p>
        <p>Type something into the search box below, and we'll search the list of used wordle words, and autocomplete your search.</p>
        <AsyncWordleAutocomplete />
      </div>
    </div>
  );
}

export default App;
