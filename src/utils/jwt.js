import jwt from 'jsonwebtoken';

export const generateToken = (user) => {

    try {

        const token = jwt.sign({ user }, PRIVATE_KEY, expiresIn : '24h');

        return token;
        
    } catch (error) {

        throw new InternalServerError(error.message)
        
        
    }
}

export const decodeToken = (token) => {

    try {

        const decoded = jwt.verify(token, PRIVATE_KEY);

        return decoded

    } catch (error) {

        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError' || error.name === 'NotBeforeError') {
            throw new NotFound(error.message)
          }
        
        throw new InternalServerError(error.message)

    }
}