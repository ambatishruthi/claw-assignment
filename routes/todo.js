const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, (req, res) => {
    const { todo } = req.body;
    const newTodo = new Todo({
        userId: req.user.userId,
        todo
    });
    newTodo.save()
        .then(() => res.status(201).json({ message: 'To-do item created' }))
        .catch(err => res.status(500).send('Server error'));
});

router.get('/', auth, (req, res) => {
    Todo.find({ userId: req.user.userId })
        .then(todos => res.json(todos))
        .catch(err => res.status(500).send('Server error'));
});

router.put('/:id', auth, (req, res) => {
    const { todo } = req.body;
    Todo.findOneAndUpdate({ _id: req.params.id, userId: req.user.userId }, { todo }, { new: true })
        .then(updatedTodo => res.json(updatedTodo))
        .catch(err => res.status(500).send('Server error'));
});

router.delete('/:id', auth, (req, res) => {
    Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.userId })
        .then(() => res.json({ message: 'To-do item deleted' }))
        .catch(err => res.status(500).send('Server error'));
});

module.exports = router;
