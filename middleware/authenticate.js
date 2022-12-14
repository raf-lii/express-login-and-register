const check = (req, res, next) => {
    if(!req.session.user){
        req.flash('error', 'Harap login terlebih dahulu');
        return res.redirect('/auth/login');
    }

    console.log(req.session);
    return next();
}

module.exports = { check };