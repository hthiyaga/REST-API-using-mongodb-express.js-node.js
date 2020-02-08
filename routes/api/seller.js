const express = require('express');
const router = express.Router();
const List = require('../../models/List');
//@route  GET api/list
//@desc   Test route
//@access public

router.post('/', async (req, res) => {
  console.log(req.body);

  const {
    user_id,
    user_type,
    name,
    address,
    phonenumber,
    email,
    website,
    reviews
  } = req.body;

  try {
    let seller = new User({
      user_id,
      user_type,
      name,
      address,
      phonenumber,
      email,
      website,
      reviews
    });

    await seller.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
  res.send('Seller route');
});

router.get('/', async (req, res) => {
  try {
    const seller = await User.find().populate();

    res.json(seller);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
