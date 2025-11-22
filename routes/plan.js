const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// Home page - Display all plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find().sort({ dateCreated: -1 });
    res.render('index', { plans });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Create plan form
router.get('/create', (req, res) => {
  res.render('create');
});

// Create new plan
router.post('/create', async (req, res) => {
  try {
    const { title, destination, content, imageURL } = req.body;
    const finalImageURL = imageURL || '/images/image1.png';
    await Plan.create({ title, destination, content, imageURL: finalImageURL });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/create');
  }
});

// Edit plan form
router.get('/edit/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    res.render('edit', { plan });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Update plan
router.put('/edit/:id', async (req, res) => {
  try {
    const { title, destination, content, imageURL } = req.body;
    await Plan.findByIdAndUpdate(req.params.id, { title, destination, content, imageURL });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Delete confirmation page
router.get('/delete/:id', async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    res.render('delete', { plan });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// Delete plan
router.delete('/delete/:id', async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
