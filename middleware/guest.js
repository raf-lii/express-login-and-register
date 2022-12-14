const check = (req, res, next) => {
    if(req.session.username){
        return res.redirect('/');
    }

    return next();
}

module.exports = { check };