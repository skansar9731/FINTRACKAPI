const express = require("express");
const cors = require("cors");
const app = express();
const ConnectDB = require("./db");
const subscribersModel = require("./Models/subscribersModel");
const categoriesModel= require("./Models/categoriesModel")
const gendersModel = require("./Models/gendersModel")
// const servicesModel = require("./Models/servicesModel");
const servicesModel = require("./Models/servicesModel");
const citiesModel = require("./Models/citiesModel")
const providersModel = require("./Models/providersModel");

app.use(express.json());
app.use(cors());

app.post("/deposite", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.get("/", (req, res) => {
  res.send("Welcome to GOPDAC....");
});

app.get("/categories", async (req,res)=>{
  ConnectDB();
  const result = await categoriesModel.find({});
  res.send(result);
})


app.post("/addcategory", (req,res)=>{
  ConnectDB();
  const newCategory= new categoriesModel(req.body);
  newCategory.save();
  res.send("New Category has been added !!!")
})
app.get("/genders", async (req,res)=>{
  ConnectDB();
  const result = await gendersModel.find({});
  res.send(result);
})

app.post("/addgender", (req,res)=>{
  ConnectDB();
  const newGender= new gendersModel(req.body);
  newGender.save();
  res.send("New Gender has been added !!!")
})
app.get("/Services", async (req,res)=>{
  ConnectDB();
  const result = await servicesModel.find({});
  res.send(result);
})

app.post("/addservices", (req,res)=>{
  ConnectDB();
  const newService= new servicesModel(req.body);
  newservice.save();
  res.send("New Service has been added !!!")
})
app.get("/cities", async (req,res)=>{
  ConnectDB();
  const result = await citiesModel.find({});
  res.send(result);
})

app.post("/addcities", (req,res)=>{
  ConnectDB();
  const newCities= new citiesModel(req.body);
  newCities.save();
  res.send("New City has been added !!!")
})
app.get("/providers", async (req,res)=>{
  ConnectDB();
  const result = await providersModel.find({});
  res.send(result);
})

app.post("/addproviders", (req,res)=>{
  ConnectDB();
  const newProviders= new providersModel(req.body);
  newProviders.save();
  res.send("New Provider has been added !!!")
})

app.get("/subscribers", async (req, res) => {
  ConnectDB();
  const result = await subscribersModel.find({});
  res.send(result);
});

app.get("/addbank", (req, res) => {
  ConnectDB();
  const bank = {
    name: "Axis",
    branch: "Chinchwad",
    city: "Pune",
  };
  const newBank = new bankModel(bank);
  newBank.save();
});
app.post("/api/getBenef", async (req, res) => {
  ConnectDB();
  const result = await benefModel.find(req.body);
  res.send(result);
});

app.post("/api/addbenef", (req, res) => {
  ConnectDB();
  const newBenef = new benefModel(req.body);
  newBenef.save();
  res.send("New beneficiary added successfully!");
});

app.post("/api/updatebenef", async (req, res) => {
  ConnectDB();
  const currbenef = await benefModel.findOne({ accno: req.body.accno });
  const newbenef = {
    accno: currbenef.accno,
    bankname: currbenef.bankname,
    branchname: currbenef.branchname,
    amnt: currbenef.amnt + Number(req.body.amnt),
    bname: currbenef.bname,
    isActive: currbenef.isActive,
  };
  currbenef.overwrite(newbenef);
  currbenef.save();
  res.send(
    "Your amount " +
      req.body.amnt +
      " has been added successfully. Balance Amount:" +
      currbenef.amnt
  );
});

app.post("/api/debitbenef", async (req, res) => {
  ConnectDB();
  const currbenef = await benefModel.findOne({ accno: req.body.accno });
  const newbenef = {
    accno: currbenef.accno,
    bankname: currbenef.bankname,
    branchname: currbenef.branchname,
    amnt: currbenef.amnt - Number(req.body.amnt),
    bname: currbenef.bname,
    isActive: currbenef.isActive,
  };
  currbenef.overwrite(newbenef);
  currbenef.save();
  res.send(
    "Your amount " +
      req.body.amnt +
      " has been debited successfully. Balance Amount:" +
      currbenef.amnt
  );
});

app.post("/api/addbank", (req, res) => {
  ConnectDB();
  const newBank = new bankModel(req.body);
  newBank.save();
  res.send("New bank added successfully!!");
});

app.post("/api/getbank", async (req, res) => {
  ConnectDB();
  const result = await bankModel.find(req.body);
  res.send(result);
});

app.listen(4040, () => {
  console.log(`Connected to server : 4040`);
});
