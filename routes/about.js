const express = require('express');
let router = express.Router({ mergeParams: true });

// localhost:3000/about/
router.get('/', (req, res) => {
  res.json({ msg: "This is the about" });
});


router.get('/details', (req, res) => {
  res.json({ msg: "You got the routes" });
  console.log("hehehaha");

});

router.get('/details/:language', (req, res) => {
    let params = req.params;
    let query = req.query;
    res.json({ params, query });
});
 


module.exports = router;