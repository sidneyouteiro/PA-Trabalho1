import React from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
};

export default App;

