import jwt from "jsonwebtoken"

const authAdmin = async (req, res, next) => {
    try {
        console.log('Headers received:', req.headers); // DEBUG
        console.log('atoken:', req.headers.atoken);    // DEBUG
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        
        const decoded = jwt.verify(atoken, process.env.JWT_SECRET)
        // Convert decoded object to string to match your login generation
        if (String(decoded) !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export default authAdmin;