import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

// Endpoint relatif pour la production AWS (via Nginx)
const API_URL = '/api/todos';

// Composant de navigation intelligent pour gérer l'état actif
const NavLink = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`nav-item ${isActive ? 'active' : ''}`}>
      <span className="nav-icon">{icon}</span>
      <span className="nav-label">{label}</span>
    </Link>
  );
};

const Dashboard = ({ todos, toggleTodo, deleteTodo }) => {
  const completedTasks = todos.filter(t => t.done).length;
  const totalTasks = todos.length;
  // Calcul du pourcentage pour le graphique circulaire
  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="widgets-grid">
      {/* SECTION 1 : LES MISSIONS */}
      <section className="widget-card tasks-widget">
        <h3>Mes Missions 🚀</h3>
        <div className="tasks-container">
          {todos.length === 0 && <p className="empty-state">Aucune mission en cours...</p>}
          {todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.done ? 'is-done' : ''}`}>
              <div className="checkbox-square" onClick={() => toggleTodo(todo.id)}>
                {todo.done && "✓"}
              </div>
              <span className="todo-text">{todo.title}</span>
              <button className="mini-delete" onClick={() => deleteTodo(todo.id)}>×</button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2 : LE CALENDRIER */}
      <section className="widget-card calendar-widget">
        <h3>Calendrier 📅</h3>
        <Calendar className="custom-calendar" />
      </section>

      {/* SECTION 3 : PROGRESSION (Graphique Circulaire) */}
      <section className="widget-card stats-widget">
        <h3>Progression 📈</h3>
        <div className="progress-display">
          <div className="progress-circle" style={{ '--p': percentage, '--b': '10px', '--c': '#ffab5c' }}>
            {percentage}%
          </div>
          <p className="stat-text"><strong>{completedTasks} / {totalTasks}</strong> accomplies.</p>
        </div>
      </section>
    </div>
  );
};

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  // Récupérer les tâches
  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      }
    } catch (e) { 
      console.error("Erreur API:", e); 
    }
  };

  useEffect(() => { 
    fetchTodos(); 
  }, []);

  // Ajouter une tâche
  const addTodo = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputText })
      });
      if (res.ok) { 
        setInputText(''); 
        fetchTodos(); 
      }
    } catch (e) {
      console.error("Erreur ajout:", e);
    }
  };

  // Supprimer une tâche
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchTodos();
    } catch (e) {
      console.error("Erreur suppression:", e);
    }
  };

  // Cocher/Décocher une tâche
  const toggleTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'PATCH' });
      fetchTodos();
    } catch (e) {
      console.error("Erreur toggle:", e);
    }
  };

  return (
    <Router>
      <div className="app-wrapper">
        <aside className="sidebar">
          <div className="logo">📌 Daynest</div>
          <nav className="nav-list">
            <NavLink to="/" icon="🏠" label="Dashboard" />
            <NavLink to="/projets" icon="📁" label="Projets" />
            <NavLink to="/notes" icon="📝" label="Notes" />
            <NavLink to="/settings" icon="⚙️" label="Paramètres" />
          </nav>
          <div className="sidebar-footer">v 5.1 Stable</div>
        </aside>

        <main className="main-content">
          <header className="top-bar">
            <form className="add-box" onSubmit={addTodo}>
              <input 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                placeholder="Post-it rapide..." 
              />
              <button type="submit">Post-it !</button>
            </form>
            <div className="profile">
              <span className="user-name">Syntyche 🧑‍🌾</span>
              <div className="avatar-circle">S</div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />} />
            <Route path="/projets" element={
              <div className="page-view">
                <h2>📁 Gestion de Projets</h2>
                <input className="glass-input" placeholder="Créer un nouveau dossier..." />
              </div>
            } />
            <Route path="/notes" element={
              <div className="page-view">
                <h2>📝 Bloc-notes</h2>
                <textarea className="glass-textarea" placeholder="Notez vos idées ici..."></textarea>
              </div>
            } />
            <Route path="/settings" element={
              <div className="page-view">
                <h2>⚙️ Paramètres</h2>
                <p>Utilisateur : Syntyche</p>
                <p>Thème : Pastel Sunset (Actif)</p>
              </div>
            } />
          </Routes>
        </main>
        
        {/* AVATAR DÉCORATIF : src="/avatar.png" cherche dans le dossier public */}
        <div className="floating-avatar-container">
          <img src="/avatar.png" alt="Mascotte Syntyche" className="floating-avatar" />
        </div>
      </div>
    </Router>
  );
}

export default App;