const express = require('express');
const Tour = require('../models/tour');
const router = express.Router();
const protect = require('../middlewares/protectedView')


router.get('/', (req, res, next) => {
  Tour.find({})
  .then((tour)=>{
    res.json(tour).status(200)
  })
  .catch(next)
})


router.get('/profile', (req, res, next) => {
  const creator = req.session.currentUser._id;
  console.log( 'i am in profile', req.session.currentUser._id)
  Tour.find({creator})
  .then((tour)=>{
    res.json(tour).status(200)
  })
  .catch(next)
})


router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Tour.findById(id)
    .then((tour) => {
      res.json({tour, message: 'tour found'}).status(200)
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/create', (req, res, next) => {
  const creator = req.session.currentUser;

  const {
    name,
    image,
    city,
    description,
    location,
    duration,
    POI,
  } = req.body;

  console.log(req.body)

  // if(!name ) {
  //   res.status(204).json({
  //     error: 'No content'
  //  })
  // }
  const tour = new Tour ({
    creator,
    name,
    image,
    city,
    description,
    location,
    duration,
    POI,
  })
  tour.save()
  .then((data)=>{
    res.json(data).status(200)

  })
  .catch(next)
});


router.get('/showTour/:id', (req, res, next) => {
  console.log('good luck')
  const {id} = req.params;
  Tour.findById(id)

  .then((tour)=>{
    res.json(tour).status(200)

  })
  .catch(next)
})



router.put('/:id/edit', (req, res, next) => {
  const {id} = req.params;
  const { tour } = req.body;

  Tour.findByIdAndUpdate(id, tour)
  .then((data)=>{
    res.json(data).status(200)

  })
  .catch(next)
});

router.delete('/:id/delete', (req, res, next) => {
  console.log('back end delete')

  const {id} = req.params;

  Tour.findByIdAndDelete(id)
  .then(()=>{
    res.json({message: 'Tour deleted'}).status(200)

  })
  .catch(next)
});

module.exports = router;