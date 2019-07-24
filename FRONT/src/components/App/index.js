// == Import : npm
import React from 'react';

// == Import : local
import Calendar from 'src/components/Calendar';
import './app.scss';

// == Composant
const App = () => (
  <div className="App">
    <header>
      <div id="logo">
        <span className="icon">date_range</span>
        <span>
          react<b>calendar</b>
        </span>
      </div>
    </header>
    <main>
      <Calendar />
    </main>
  </div>
);

// == Export
export default App;
