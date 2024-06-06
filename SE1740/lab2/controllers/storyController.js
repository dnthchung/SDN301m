const db = require("../models");
const Story = db.story;

//add with data input is title
async function add(req, res, next) {
  try {
    const newStory = new Story({
      title: req.body.title,
    });
    await newStory
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

//update story just title with id, return fan[], get all old fan element and insert new to fan[]
async function edit(req, res, next) {
  try {
    const storyId = req.params.id;
    const updatedStory = {
      title: req.body.title,
      fans: req.body.fans,
    };
    await Story.findByIdAndUpdate(storyId, updatedStory, { new: true })
      .then((updatedDoc) => {
        res.status(200).json(updatedDoc);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  add,
  edit,
};
