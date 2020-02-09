const express = require('express');
const router = express.Router();
const List = require('../../models/List');
const Lead = require('../../models/Lead');

//@route  GET api/list
//@desc   Test route
//@access public

router.post('/', async (req, res) => {
  console.log(req.body);

  const { vehicle_id, name, phonenumber, email, status, created_at } = req.body;

  try {
    let lead = new Lead({
      vehicle_id,
      name,
      phonenumber,
      email,
      status,
      created_at
    });

    await lead.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
  res.send('Seller route');
});

// change status to distributed
router.put('/:id', async (req, res) => {
  try {
    let lead = await Lead.findOne({ _id: req.params.id }).populate();
    lead.status = 'Distributed';
    await lead.save();

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//Get leads based on vehicle id as well as lead id

router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.find({
      vehicle_id: req.params.id,
      status: 'Distributed'
    }).populate();
    if (lead.length > 0) {
      res.json(lead);
    } else {
      const lead = await Lead.find({ _id: req.params.id }).populate();
      res.json(lead);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//get all leads
router.get('/', async (req, res) => {
  try {
    const lead = await Lead.find().populate();

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//update status of the lead

router.put('/update/:id/', async (req, res) => {
  try {
    let lead = await Lead.findOne({ _id: req.params.id }).populate();
    lead.status = 'Delete';
    await lead.save();

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
