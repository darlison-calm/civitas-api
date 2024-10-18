import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
  tipoConta: string;
  apelido: string;
}

/**
 * Middleware para autenticar usuários com base em um token JWT.
 * Verifica se o token é válido e o decodifica, adicionando os dados do
 * usuário ao req.user. Se o token for inválido, retorna um erro 403.
 * @param req - Objeto da requisição HTTP.
 * @param res - Objeto da resposta HTTP.
 * @param next - Função de callback para passar o controle para o próximo middleware.
 */
export async function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];
  const SECRET_KEY = process.env.JWT_SECRET;

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;

    // Adiciona os dados do usuário ao req.user
    req.user = {
      id: decoded.id,
      tipoConta: decoded.tipoConta,
      apelido: decoded.apelido
    };

    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido.' });
  }
}
