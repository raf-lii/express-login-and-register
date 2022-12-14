const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

const create = (req, res) => {
    return res.render('main', {
        title: "Login",
        template: "components/auth/login",
        error: req.flash('error'),
        success: req.flash('success'),
        errorForm: req.flash('errorKey'),
    });
};

const store = async (req, res) => {
    const { username, password } = req.body;
    const user = UserModel.connected;

    const userData = await user.findOne({username});

    if(!userData){
        req.flash('error', 'Data anda tidak cocok');
        return res.redirect('/auth/login');
    }

    const compare = await bcrypt.compare(password, userData.password);
    
    if(!compare){
        req.flash('error', 'Data anda tidak cocok');
        return res.redirect('/auth/login');
    }

    req.session.user = {name: userData.name, username: userData.username};
    
    return res.redirect('/');
};

module.exports = { create, store }