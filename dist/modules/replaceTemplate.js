"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (temp, product) => {
    return temp
        .replaceAll('{{NAME}}', product.productName)
        .replaceAll('{{PRICE}}', product.price.toString())
        .replaceAll('{{IMAGE}}', product.image)
        .replaceAll('{{FROM}}', product.from)
        .replaceAll('{{NUTRIENTS}}', product.nutrients)
        .replaceAll('{{DESCRIPTION}}', product.description)
        .replaceAll('{{ID}}', product.id.toString())
        .replaceAll('{{ORGANIC}}', !product.organic ? 'not-organic' : '')
        .replaceAll('{{QUANTITY}}', product.quantity.toString());
};
// CommonJs: module.exports = () => {}
