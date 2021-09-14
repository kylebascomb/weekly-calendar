const express = require("express");
const router = express.Router();
const Event = require("../models/event.model");
const passport = require("passport");
const validatePostInput = require("../validation/event");



router.get("/", passport.authenticate("jwt", {session: false}), 
    (req, res) => {
        Event.find({userID: req.user.email})
        .then(events => res.status(200).json(events))
        .catch(err => res.status(400).json({user: "Error fetching events of logged in user"}));
    });


router.get("/event/:id", (req, res) => {
    Event.find({userID: req.params.email})
        .then(events => res.status(200).json(events))
        .catch(err => res.status(400).json({id: "Error fetching event by id"}));
});

router.put("/event/update/:id", (req, res) => {
    console.log("Updating " + req.params.id);
    Event.findByIdAndUpdate(req.params.id, req.body)
        .then(doc => res.json(doc))
        .catch(err => console.log({ create: "Error updating event", err: err }));
})


router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
       const user = req.user.email;
       const event = req.body;
       const { errors, isValid } = validatePostInput(event);
       if (!isValid) {
          return res.status(400).json(errors);
       }
       event.userID = user;
       const newEvent = new Event(event);
       newEvent
          .save()
          .then(doc => res.json(doc))
          .catch(err => console.log({ create: "Error creating new event", err: err }));
    }
 );

 router.delete("/event/delete/:id", (req, res) => {
    console.log("Deleting " + req.params.id);
    Event.findByIdAndDelete(req.params.id)
        .then(doc => res.json(doc))
        .catch(err => console.log({ create: "Error deleting event", err: err }));
});

 module.exports = router;