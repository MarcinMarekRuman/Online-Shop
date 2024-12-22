
const logout = (req, res)=>{
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('token');
        return res.json({ message: 'Logged out successfully' });
    });
}

module.exports = logout;