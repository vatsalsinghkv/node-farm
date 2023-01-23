"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_http_1 = require("node:http");
const replaceTemplate_1 = __importDefault(require("./modules/replaceTemplate"));
// const fs = require('fs');
// const http = require('http');
// SYNCHRONOUS CODE
/* const data = fs.readFileSync('txt/input.txt', 'utf-8');
fs.writeFileSync(
  'txt/output.txt',
  `${new Date().toLocaleDateString()},\n${data}`
);
console.log(data); */
// ASYNC CODE
/*
fs.readFile('txt/input.txt', (err, data) => {
  console.log(data);
});

console.log('reading file...');
 */
const HOSTNAME = 'localhost';
const PORT = 3000;
const BASE_URL = `https://${HOSTNAME}:${PORT}`;
const productDataJSON = (0, node_fs_1.readFileSync)(`${__dirname}/../dev-data/data.json`, 'utf-8');
const productData = JSON.parse(productDataJSON);
const tempOverview = (0, node_fs_1.readFileSync)(`${__dirname}/../templates/overview.html`, 'utf-8');
const tempCard = (0, node_fs_1.readFileSync)(`${__dirname}/../templates/overview-card.html`, 'utf-8');
const tempProduct = (0, node_fs_1.readFileSync)(`${__dirname}/../templates/product.html`, 'utf-8');
// This function gets executed every time when request is made
const server = (0, node_http_1.createServer)((req, res) => {
    const url = new URL(`${BASE_URL}${req.url}`);
    if (url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cards = productData
            .map((product) => (0, replaceTemplate_1.default)(tempCard, product))
            .join('');
        res.write(tempOverview.replaceAll('{{PRODUCTS}}', cards));
        return res.end();
    }
    if (url.pathname === '/product') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const id = url.searchParams.get('id');
        const product = productData.find((p) => p.id === +id);
        if (product)
            res.write((0, replaceTemplate_1.default)(tempProduct, product));
        return res.end();
    }
    if (url.pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
        //   console.log(JSON.parse(data));
        //   res.write(data);
        //   res.end();
        // });
        res.write(productDataJSON);
        return res.end();
    }
    res.writeHead(404, { 'Content-Type': 'text/html' });
    // res.statusCode = 404;
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Default</h1>');
    res.end('<h1>Page not found!</h1>');
});
server.listen(PORT, HOSTNAME, () => console.log(`Listening on ${BASE_URL}`));
