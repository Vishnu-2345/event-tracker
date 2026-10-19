import { format } from 'date-fns';

const EventList = ({ events, onEdit, onDelete }) => {
  if (!events || events.length === 0) {
    return <p>No events to display.</p>;
  }

  return (
    <div className="event-list">
      {events.map(event => (
        <div key={event._id} className="event-item">
          <div className="event-header">
            <h3>{event.title}</h3>
            <span className="event-category">{event.category || 'General'}</span>
          </div>
          <p className="event-description">{event.description || ''}</p>
          <div className="event-time">
            <strong>{format(new Date(event.startTime), 'PPp')}</strong> -
            <strong>{format(new Date(event.endTime), 'PPp')}</strong>
            {event.isAllDay && <span> (All day)</span>}
          </div>
          {event.location && <p className="event-location">📍 {event.location}</p>}
          <div className="event-actions">
            <button onClick={() => onEdit(event)}>Edit</button>
            <button onClick={() => onDelete(event._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;