const express = require('express');

const subServiceController = require('./../../controllers/admin/subServices');

const app = express.Router();

/**
 * @api 
 * @route /get-category
 * 
 * @description api to get products.
 */
app.get('/get-subservices/:id', subServiceController.getSubService);

/**
 * @api
 * @route /add-product
 * 
 * @description api to add product
 */
app.post('/add-subservice', subServiceController.postSubService)

/**
 * @api
 * @route /update-product
 * 
 * @description api to update product
 */
app.put('/update-subservice/:id', subServiceController.updateSubService)

/**
 * @api
 * @route /delete-product
 * 
 * @description api to delete product
 */
app.delete('/delete-subservice/:id', subServiceController.deleteSubService)
/**
 * @api
 * @route /delete-all-product
 * 
 * @description api to delete all products
 */
//  app.delete('/delete-all-category', categoryController.deleteAllCategory)

module.exports = app;