const db = require("../models");
const Leader = db.leader;

// Create a new leader
async function create(req, res, next) {
  try {
    const newLeader = new Leader({
      name: req.body.name,
      image: req.body.image,
      designation: req.body.designation,
      abbr: req.body.abbr,
      description: req.body.description,
      featured: req.body.featured,
    });
    await newLeader
      .save()
      .then((newDoc) => {
        res.status(201).json(newDoc);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

// Get all leaders
async function findAll(req, res, next) {
  try {
    await Leader.find({})
      .then((leaders) => {
        res.status(200).json(leaders);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

// Get a single leader by ID
async function findOne(req, res, next) {
  try {
    await Leader.findById(req.params.leaderId)
      .then((leader) => {
        if (!leader) {
          res.status(404).json({ message: "Leader not found" });
        } else {
          res.status(200).json(leader);
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

// Update a leader by ID
async function update(req, res, next) {
  try {
    await Leader.findByIdAndUpdate(req.params.leaderId, req.body, { new: true })
      .then((leader) => {
        if (!leader) {
          res.status(404).json({ message: "Leader not found" });
        } else {
          res.status(200).json(leader);
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

// Delete a leader by ID
async function remove(req, res, next) {
  try {
    await Leader.findByIdAndDelete(req.params.leaderId)
      .then((leader) => {
        if (!leader) {
          res.status(404).json({ message: "Leader not found" });
        } else {
          res.status(204).json({ message: "Leader deleted successfully" });
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};
