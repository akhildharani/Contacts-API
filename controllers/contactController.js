const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")
//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts=asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id: req.user.id});

    res.status(200).json(contacts);
})

//@desc Create new contact
//@route POST /api/contacts
//@access private

const createContact= asyncHandler(async (req,res)=>{
   // console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name, email, phone, user_id : req.user.id
    })
    res.status(201).json(contact);
});


//@desc Get contact
//@route GET /api/contacts/:name
//@access private

const getContact= asyncHandler(async (req,res) => {
    const contact = await Contact.findOne({user_id: req.user.id, 
        name: req.params.name});
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    res.status(200).json(contact);
});


//@desc Update contact
//@route PUT /api/contacts/:name
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({name: req.params.name});
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other user's contacts");
    }

    const updatedContact = await Contact.findOneAndUpdate(
        { user_id: req.user.id, name: req.params.name }, // Use a query object
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});



//@desc Delete contact
//@route DELETE /api/contacts/:name
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({name: req.params.name});
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to delete other user's contacts");
    }
    
    const deletedContact = await Contact.findOneAndDelete({ 
        user_id: req.user.id, 
        name: req.params.name 
    });

    res.status(200).json(deletedContact);
});

module.exports= {getContacts , createContact, getContact , updateContact , deleteContact};