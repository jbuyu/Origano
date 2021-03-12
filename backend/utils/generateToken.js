import jwt from 'jsonwebtoken'

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET)
}

export default generateToken;