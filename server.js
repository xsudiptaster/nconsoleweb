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
const query = require("./server/Query");
const insert = require("./server/Insert");
const deleteMethod = require("./server/Delete");
const update = require("./server/Update");
const apexCode = require("./server/ApexCode");
const metadataRetrieve = require("./server/MetadataRetrieve");
const metadataDeploy = require("./server/MetadataDeploy");
const metadataDelete = require("./server/MetadataDelete");
const metadataList = require("./server/MetadataList");
const toolingQuery = require("./server/ToolingQuery");
const metadataDescribe = require("./server/MetadataDescribe");
const sendEmail = require("./server/SendEmail");
dotenv.config();

const port = process.env.PORT || 5000;
const buildPath = path.join(__dirname, "build");

const app = express();
app.use(express.static(buildPath));
app.use(express.json({ limit: "100mb" }));
app.use(cors());
app.post("/api", async (req, res) => {
   let response = await identity(req.body);
   res.json(response);
});
app.post("/api/login", async (req, res) => {
   let response = {
      CLIENT_ID: process.env.CLIENT_ID,
      CLIENT_SECRET: process.env.CLIENT_SECRET,
      CALLBACK: process.env.CALLBACK,
   };
   res.json(response);
});
app.post("/api/identity", async (req, res) => {
   let response = await identity(req.body);
   res.json(response);
});
app.post("/api/logOut", async (req, res) => {
   let response = await logout(req.body);
   res.json(response);
});
app.post("/api/query", async (req, res) => {
   let response = await query(req.body);
   res.json(response);
});
app.post("/api/toolingQuery", async (req, res) => {
   let response = await toolingQuery(req.body);
   res.json(response);
});
app.post("/api/insert", async (req, res) => {
   let response = await insert(req.body);
   res.json(response);
});
app.post("/api/delete", async (req, res) => {
   let response = await deleteMethod(req.body);
   res.json(response);
});
app.post("/api/update", async (req, res) => {
   let response = await update(req.body);
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
app.post("/api/metadataDescribe", async (req, res) => {
   let response = await metadataDescribe(req.body);
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
app.post("/api/metadataRetrieve", async (req, res, next) => {
   let response = await metadataRetrieve(req.body);
   res.json(response);
   next();
});
app.post("/api/metadataDeploy", async (req, res, next) => {
   let response = await metadataDeploy(req.body);
   res.json(response);
   next();
});
app.post("/api/metadataDelete", async (req, res) => {
   let response = await metadataDelete(req.body);
   res.json(response);
});
app.post("/api/metadataList", async (req, res) => {
   let response = await metadataList(req.body);
   res.json(response);
});
app.post("/api/apexCode", async (req, res) => {
   let response = await apexCode(req.body);
   res.json(response);
});
app.post("/api/apexCode", async (req, res) => {
   let response = await apexCode(req.body);
   res.json(response);
});
app.post("/api/sendEmail", async (req, res) => {
   let response = await sendEmail(req.body);
   res.json(response);
});
app.get("*", (req, res) => {
   res.sendFile(path.join(buildPath, "index.html"));
});

// Showing that the server is online and running and listening for changes
app.listen(port, () => {
   console.log(`Server is online on port: ${port}`);
});
