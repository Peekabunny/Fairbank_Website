const requireAdmin = (req, res, next) => {

  if (req.user && req.user.role === 'Administrator') {
   
    next();
  } else {
  
    res.status(403).json({ error: 'Admin access required. Request forbidden.' });
  }
};

export default requireAdmin;