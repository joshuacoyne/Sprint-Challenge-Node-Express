const express = require('express');

const router = express.Router();

const actionDb = require('./../helpers/actionModel.js');
const projectDb = require('../helpers/projectModel.js');

router.get('/', (req, res) => {
    actionDb.get()
    .then (response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was a server error.'});
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionDb.get(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was a server error'});
    })
});

router.post('/', (req, res) => {
    const {project_id, description, notes, completed} = req.body;
    if (!project_id || !description){
        res.json({error: 'Project id and description are required'})
    } else if (description.length > 128){
        res.json({error: 'Description must not exceed 128 characters.'})
    } else {
        projectDb.get(project_id)
        .then(response => {
            actionDb.insert({project_id, description, notes, completed})
            .then(response => {
                res.status(200).json(response);
            })
            .catch(error => {
                res.status(500).json({error: 'There was a server error'});
            })
        })
        .catch(error => {
            res.status(400).json({error: 'The project id must correspond to a current project.'})    
        })                        
    } 
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    actionDb.update(id, updates)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was a server error'});
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actionDb.remove(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error: 'There was a server error'});
    })
});



module.exports = router;