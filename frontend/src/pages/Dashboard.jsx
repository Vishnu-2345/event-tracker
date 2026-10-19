import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEvents, createEvent, deleteEvent } from '../services/eventService';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (eventData) => {
    try {
      const newEvent = await createEvent(eventData);
      setEvents([...events, newEvent]);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to create event:', err);
    }
  };

  const handleUpdate = async (updatedEvent) => {
    try {
      const updated = await updateEvent(editEvent._id, updatedEvent);
      setEvents(events.map(event => event._id === editEvent._id ? updated : event));
      setEditEvent(null);
    } catch (err) {
      console.error('Failed to update event:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      console.error('Failed to delete event:', err);
    }
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setShowForm(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Schedule Tracker</h1>
        <p>Welcome, {user?.username}!</p>
        <button onClick={() => { logout(); navigate('/login'); }}>
          Logout
        </button>
      </header>

      <div className="dashboard-body">
        <aside>
          <h2>Upcoming Events</h2>
          {events.length === 0 ? (
            <p>No events yet. Create one to get started!</p>
          ) : (
            <EventList
              events={events}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </aside>

        <main>
          <h2>{editEvent ? 'Edit Event' : 'Add New Event'}</h2>
          <EventForm
            event={editEvent}
            onSubmit={editEvent ? handleUpdate : handleCreate}
            onCancel={() => {
              setEditEvent(null);
              setShowForm(false);
            }}
          />
          {(!editEvent || !showForm) && (
            <button onClick={() => setShowForm(true)}>+ Add Event</button>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;