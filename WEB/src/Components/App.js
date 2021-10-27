import '../Styles/App.css';
import VerticalTabs from './VerticalTabs'
import Banner from './Banner'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src='/Img/Logo.jpg' height="50" width="150" alt='logo'></img>
      </header>
      <Banner />
      <VerticalTabs />
    </div>
  );
}

export default App;
