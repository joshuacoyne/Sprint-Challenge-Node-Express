const express = require('express');

const router = express.Router();

const projectDb = require('../helpers/projectModel.js');

module.exports = router;

router.get('/', (req, res) => {
    projectDb.get()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was a server error'});
    })
    
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectDb.get(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was a server error'});
    })
});

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    projectDb.getProjectActions(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was a server error'});
    })
});

router.post('/', (req, res) => {
    const {name , description, completed} = req.body;
    if (!name || !description) {
        res.status(400).json({error: 'Name and description are required'})
    } else if (name.length > 128 || description.length > 128) {
        res.status(400).json({error: 'Name and description must be no more that 128 characters.'});
    } else {
        projectDb.insert({name, description, completed})
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({error: 'There was a server error'});
        })
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    projectDb.update(id, updates)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was a server error'});
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    projectDb.remove(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was a server error'});
    })
});
