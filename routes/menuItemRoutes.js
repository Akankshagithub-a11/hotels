const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

//post route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body content the person data

    // create new Person document using the mongoose model
    const newMenuItem = new MenuItem(data);

    //save the new Person to the database
    const response = await newMenuItem.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Errror" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // EXtract the work type from the URL parameter
    if (
      tasteType == "sweet" ||
      (tasteType == "spicy") | (tasteType == "sour")
    ) {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const MenuItemId = req.params.id; //Extract the id from the URL parameter
    const updatedMenuItemData = req.body; //Updated data for the person

    const response = await MenuItem.findByIdAndUpdate(
      MenuItemId,
      updatedMenuItemData,
      {
        new: true, // Returen updated document
        runValidators: true, //Run Mongoose validation
      }
    );

    // Person Id is not present
    if (!response) {
      return res.status(404).json({ error: " MenuItem not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const MenuItemId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(MenuItemId);

    if (!response) {
      return res.status(404).json({ message: "MenuItem not found" });
    }

    console.log("data deleted");
    res.status(200).json({ message: "Menu Item Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// comment added
module.exports = router;
