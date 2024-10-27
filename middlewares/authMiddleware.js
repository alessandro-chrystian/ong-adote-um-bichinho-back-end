import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Token não fornecido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};