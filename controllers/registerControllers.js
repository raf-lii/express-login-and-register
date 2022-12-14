const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

const create = (req, res) => {
    return res.render('main', {
        title: "Register",
        template: "components/auth/register",
        error: req.flash('error'),
        success: req.flash('success'),
        errorForm: req.flash('errorKey'),
    });
};

const checkUser = async ( username ) => {
    const user = UserModel.connected;

    const userData = await user.findOne({username});

    if(userData){
        return true;
    }

    return false;
}

const store = async (req, res, next) => {
    const { name, username, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 16);

    const createUser = UserModel.connected({name, username, password: hashedPass});

    createUser.save()
        .then(res => {
            req.flash('success', 'Berhasil melakukan pembuatan akun, silakan login');
        })
        .catch(e => {
            req.flash('error', 'Gagal melakukan pembuatan akun');
        });

    return res.redirect('/auth/login');
}

module.exports = { create, checkUser, store }