// frontend/src/App.js
import React, { useState } from 'react';
import './App.css';
import Messages from "./Pages/Messages";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus('Message sent! Thank you.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('Error sending message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Network error.');
    }
  };

  return (
    <Router>
      <nav style={{ padding: "10px", background: "#ddd" }}>
        <Link to="/" style={{ marginRight:"20px" }}>Home</Link>
        <Link to="/admin/messages">Admin Messages</Link>
      </nav>

      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <div className="app">
            <header className="hero">
              <h1>SanJoey — Portfolio</h1>
              <p>MERN Stack Developer</p>
            </header>

            <main className="content">
              <section className="intro">
                <h2>About Me</h2>
                <p>Clean, modern websites built with MERN.</p>
              </section>

              <section className="contact">
                <h2>Contact Me</h2>
                <form onSubmit={handleSubmit}>
                  <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                  <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                  <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
                  <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
                  <button type="submit">Send</button>
                </form>
                <p>{status}</p>
              </section>
            </main>
          </div>
        } />

        {/* Admin Messages Page */}
        <Route path="/admin/messages" element={<Messages />} />
      </Routes>
    </Router>
  );
}

export default App;
