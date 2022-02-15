const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/user/login')
    }
}

module.exports = {
    isAuth
}