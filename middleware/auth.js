const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (request, response, next) => {
    // console.log(request.cookies.accessToken);
    const token = request.cookies.accessToken;
    // console.log(token);
    if (!token) {
        // next();
        return response.sendStatus(401);
        
    }
    const decodeToken = jwt.decode(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(decodeToken.id);
    request.user = user;
    next();
}

module.exports = auth;