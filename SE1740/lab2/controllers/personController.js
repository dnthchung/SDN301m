const db = require("../models");
const Person = db.person;

//Create a person
async function add(req, res, next) {
  try {
    if (req.body) {
      const newPerson = new Person({
        name: req.body.name,
        age: req.body.age,
        stories: req.body.stories,
      });
      await newPerson
        .save()
        .then((newDoc) => {
          res.status(201).json(
            //return _id, name, age , story[] - if story null return []
            newDoc
          );
        })
        .catch((error) => {
          next(error);
        });
    }
  } catch (error) {
    next(error);
  }
}

// Update story title and append new fans to the existing fans array
async function edit(req, res, next) {
  try {
    const personId = req.params.id;
    console.log("personId" + personId);
    const { name, age, stories: newStories } = req.body;

    // Find person by ID
    const personFound = await Person.findById(personId);
    if (!personFound) {
      return res.status(404).json({ message: "Person not found" });
    }

    // Update person's fields if provided
    personFound.name = name ? name : personFound.name;
    personFound.age = age ? age : personFound.age;

    // Append new stories to the existing stories array
    if (newStories && newStories.length > 0) {
      personFound.stories = [...personFound.stories, ...newStories];
    }

    // Save the updated person
    const updatedPerson = await personFound.save();

    res.status(200).json(updatedPerson);
  } catch (error) {
    next(error);
  }
}

//get all person with their all stories
async function list(req, res, next) {
  try {
    await Person.find()
      .populate("stories")
      .then((persons) => {
        res.status(200).json(persons);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}
const list2 = async (req, res, next) => {
  try {
    const persons = await Person.find({}).populate("stories").exec();

    if (!persons || persons.length === 0) {
      return next(createError(404, "Person not found"));
    }

    const result = persons.map((person) => ({
      name: person.name,
      age: person.age,
      stories:
        person.stories.length > 0
          ? person.stories.map((story) => story.title)
          : [],
    }));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  edit,
  list,
  list2,
};
