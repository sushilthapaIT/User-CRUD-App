const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private 
const getContact = asyncHandler(async(req, res) => { //api call
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Create New Contacts
//@route Post /api/contacts
//@access private 
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is", req.body);
    const { firstName, lastName, dob, address1, address2, city, postalCode, country, number, email, userNotes } = req.body;
  
    if (!firstName || !lastName || !dob || !address1 || !city || !postalCode || !country || !number || !email || !userNotes) {
      res.status(400).json({ message: "All fields are mandatory." });
      throw new Error("All fields are mandatory.");
    }

    const existingContact = await Contact.findOne({ $or: [{ number }, { email }] });
    if (existingContact) {
        res.status(400).json({ message: "Phone number or email already in use." });
        throw new Error("Phone number or email already in use.");
    }
  
    const contact = await Contact.create({
      firstName,
      lastName,
      dob,
      address1,
      address2,
      city,
      postalCode,
      country,
      number,
      email,
      userNotes,
      user_id: req.user.id, 
    });
  
    res.status(201).json(contact);
  });
  
//@desc Get Contacts
//@route GET /api/contacts
//@access private 
const getContacts = asyncHandler(async(req, res) => { //api call
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});


//@desc Update New Contacts
//@route PUT /api/contacts:id
//@access private 
const updateContact = asyncHandler(async(req, res) => { //to update
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have permission to update other user contacts.");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateContact);
});

//@desc Delete Contacts
//@route Delete /api/contacts:id
//@access private 
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have permission to update other user contacts.");
    }

    await Contact.deleteOne({_id: req.params});
    res.status(200).json({ message: `Contact ${req.params.id} deleted` });
});


module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};