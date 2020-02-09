const express = require('express');
const router = express.Router();
const List = require('../../models/List');
const Lead = require('../../models/Lead');
const User = require('../../models/User');
//@route  POST api/list
//@desc   Test route
//@access public

router.post('/', async (req, res) => {
  console.log(req.body);

  const {
    year,
    make,
    model,
    description,
    price,
    vehicletype,
    meta,
    images,
    user_id
  } = req.body;

  try {
    let list = new List({
      year,
      make,
      model,
      description,
      price,
      vehicletype,
      meta,
      images,
      user_id
    });

    await list.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
  res.send('List route');
});

//@route  GET api/list
//@desc   Get all lists
//@access public
router.get('/', async (req, res) => {
  try {
    const list = await List.find().populate();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  GET api/list
//@desc   Get list by ID
//@access public
router.get('/searchby/:id', async (req, res) => {
  try {
    const list = await List.find({ _id: req.params.id }).populate();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//@route  GET api/list
//@desc   Get list based on vehicle type
//@access public
router.get('/searchby/', async (req, res) => {
  try {
    //  if (typeof req.query.fromrange == 'undefined') {
    //   req.query.fromrange = 0;
    //   req.query.torange = 0;
    // }
    const list = await List.find({
      vehicletype: req.query.type,
      $or: [
        { make: req.query.keyword },
        { model: req.query.keyword },
        { description: req.query.keyword },
        { 'meta.color': req.query.keyword },
        { 'meta.transmission': req.query.keyword }
      ],
      price: { $gt: req.query.fromrange, $lt: req.query.torange }
    }).populate();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  GET api/list
//@desc   Get list based on pricerange
//@access public

router.get('/searchbypricerange/', async (req, res) => {
  console.log(req.query.fromrange);
  try {
    const list = await List.find({
      price: { $gt: req.query.fromrange, $lt: req.query.torange }
    }).populate();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

// let page_size = 10;
// skips = page_size * (page_num - 1);
// //for page 1
// // skips =10 *(1-1);
// //skips =0
// // It will fetch first 10 records

// //for page 2
// // skips =10 *(2-1);
// //skips =10
// // It will skip the first 10 records fetches from 10-20
// const list = await List.find()
//   .skip(skips)
//   .limit(page_size).populate;
