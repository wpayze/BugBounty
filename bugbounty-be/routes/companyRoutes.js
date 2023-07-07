const express = require('express');
const companyController = require('../controllers/companyController');
const authenticateJWT = require('../middlewares/authenticateJWT');

const router = express.Router();

// router.get('/', companyController.getAllCompanies);
// router.get('/:companyId', companyController.getCompanyById);
router.post('/', companyController.createCompany);
router.put('/:companyId', authenticateJWT, companyController.updateCompanyById);
//router.delete('/:companyId', companyController.deleteCompanyById);

module.exports = router;
