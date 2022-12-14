const express = require('express');
const router = express.Router();
const { validationResult, body, check } = require('express-validator');
const authControllers = require('../controllers/authControllers');
const registerControllers = require('../controllers/registerControllers');
const guest = require('../middleware/guest');

router.get('/login', guest.check, (req, res, next) => {
    next();
}, authControllers.create);

router.get('/register', guest.check, (req,res, next) => {
    next();
}, registerControllers.create);

router.post('/login', guest.check, 
    [
        check('username')
            .notEmpty()
            .withMessage('Harap isi username')
            .isLength({min: 5})
            .withMessage('Username minimal 8 karakter'), 
        check('password')
            .notEmpty()
            .withMessage('Harap isi password')
            .isLength({min: 3})
            .withMessage('Password minimal 8 karakter')
    ], 
    (req, res, next) => {
        try{
            const validation = validationResult.withDefaults({
                formatter: error => {
                    return {
                        param: error.param,
                        message: error.msg,
                        value: error.value
                    };
                },
            })

            const error = validation(req).throw();

        }catch(e) {
            req.flash('errorKey', e.array({ onlyFirstError: true }));
            req.flash('error', 'Harap isi semua data');
            return res.redirect('/auth/login');
        }
        next();
}, authControllers.store);

router.post('/register', guest.check,
    [
        check('name')
            .notEmpty()
            .withMessage('Harap isi nama'),
        check('username')
            .notEmpty()
            .withMessage('Harap isi username')
            .isLength({min: 5})
            .withMessage('Username minimal 5 karakter')
            .custom((value) => {
                return registerControllers.checkUser(value).then(res => {
                    if(res){
                        console.log(res);
                        return Promise.reject('Username telah digunakan');
                    }
                })
            }),            
        check('password')
            .notEmpty()
            .withMessage('Harap isi password')
            .isLength({min: 8})
            .withMessage('Password minimal 8 karakter')
    ],
    (req, res, next) => {
        try{
            const validation = validationResult.withDefaults({
                formatter: error => {
                    return {
                        param: error.param,
                        message: error.msg,
                        value: error.value
                    };
                },
            })

            const error = validation(req).throw();

        }catch(e) {
            req.flash('errorKey', e.array({ onlyFirstError: true }));
            req.flash('error', 'Harap isi semua data');
            return res.redirect('/auth/register');
        }
        next();        
}, registerControllers.store);

module.exports = router;