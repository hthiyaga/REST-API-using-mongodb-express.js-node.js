const express = require('express');
const router = express.Router();
const List = require('../../models/List');
const Lead = require('../../models/Lead');
//@route  GET api/list
//@desc   Test route
//@access public

router.post('/', async (req, res) => {
  console.log(req.body);

  const { vehicle_id, name, phonenumber, email, softdelete } = req.body;

  try {
    let lead = new Lead({
      vehicle_id,
      name,
      phonenumber,
      email,
      softdelete
    });

    await lead.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
  res.send('Seller route');
});

//Get leads for specific vehicles
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const lead = await Lead.find({ vehicle_id: req.params.id }).populate();

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//get all leads
router.get('/', async (req, res) => {
  try {
    console.log(req.params.id);
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
    if (lead) {
      lead = await Lead.findOneAndUpdate({ softdelete: true });
    }
    await lead.save();

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
