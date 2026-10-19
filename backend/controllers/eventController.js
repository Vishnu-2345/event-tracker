const asyncHandler = require('express-async-handler');
const Event = require('../Models/Event');

// @desc    Get events for logged in user
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id });
  res.status(200).json(events);
});

// @desc    Create event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, startTime, endTime, isAllDay, category, location, isRecurring, recurrencePattern } = req.body;

  // Validation
  if (!title || !startTime || !endTime) {
    res.status(400);
    throw new Error('Please add title, start time, and end time');
  }

  const event = await Event.create({
    title,
    description,
    startTime,
    endTime,
    isAllDay: isAllDay || false,
    category,
    location,
    user: req.user.id,
    isRecurring: isRecurring || false,
    recurrencePattern: recurrencePattern || null,
  });

  res.status(201).json(event);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check ownership
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedEvent);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  // Check ownership
  if (event.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await event.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};