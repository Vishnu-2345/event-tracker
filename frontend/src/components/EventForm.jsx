import { useState } from 'react';
import { format } from 'date-fns';

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [description, setDescription] = useState(event ? event.description : '');
  const [startTime, setStartTime] = useState(event ? new Date(event.startTime) : new Date());
  const [endTime, setEndTime] = useState(event ? new Date(event.endTime) : new Date());
  const [isAllDay, setIsAllDay] = useState(event ? event.isAllDay : false);
  const [category, setCategory] = useState(event ? event.category : '');
  const [location, setLocation] = useState(event ? event.location : '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (startTime >= endTime) {
      setError('End time must be after start time');
      return;
    }

    const eventData = {
      title,
      description,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      isAllDay,
      category: category || undefined,
      location: location || undefined,
      // For simplicity, we're not handling recurrence in this version
      isRecurring: false,
      recurrencePattern: null,
    };

    try {
      await onSubmit(eventData);
      onCancel();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event');
    }
  };

  return (
    <div className="event-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={format(startTime, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setStartTime(new Date(e.target.value))}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={format(endTime, "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setEndTime(new Date(e.target.value))}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isAllDay}
              onChange={(e) => setIsAllDay(e.target.checked)}
            />
            All day event
          </label>
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="form-actions">
          <button type="submit">
            {event ? 'Update Event' : 'Create Event'}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;