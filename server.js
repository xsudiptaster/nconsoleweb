const identity = require("./server/Identity");
const describeGlobal = require("./server/DescribeGlobal");
const objectDescribe = require("./server/ObjectDescribe");
const logout = require("./server/Logout");
const fetchCall = require("./server/Fetch");
const metadataRead = require("./server/MetadataRead");
const metadataUpsert = require("./server/MetadataUpsert");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const buildPath = path.join(__dirname, "build");

app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());
app.post("/api", async (req, res) => {
   let response = await identity(req.body);
   res.json(response);
});
app.post("/api/login", async (req, res) => {
   let response = { CLIENT_ID: process.env.CLIENT_ID, CLIENT_SECRET: process.env.CLIENT_SECRET, CALLBACK: process.env.CALLBACK };
   res.json(response);
});
app.post("/api/identity", async (req, res) => {
   let response = await identity(req.body);
   res.json(response);
});
app.post("/api/describeGlobal", async (req, res) => {
   let response = await describeGlobal(req.body);
   res.json(response);
});
app.post("/api/objectDescribe", async (req, res) => {
   let response = await objectDescribe(req.body);
   res.json(response);
});
app.post("/api/logout", async (req, res) => {
   let response = await logout(req.body);
   res.json(response);
});
app.post("/api/fetch", async (req, res) => {
   let response = await fetchCall(req.body);
   res.json(response);
});
app.post("/api/metadataRead", async (req, res) => {
   let response = await metadataRead(req.body);
   res.json(response);
});
app.post("/api/metadataUpsert", async (req, res) => {
   let response = await metadataUpsert(req.body);
   res.json(response);
});
app.get("*", (req, res) => {
   res.sendFile(path.join(buildPath, "index.html"));
});

// Showing that the server is online and running and listening for changes
app.listen(port, () => {
   console.log(`Server is online on port: ${port}`);
});
