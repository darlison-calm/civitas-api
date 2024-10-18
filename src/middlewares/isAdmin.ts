import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para verificar se o usuário é um administrador.
 * Verifica se o usuário possui o tipo de conta 'admin' para permitir o acesso.
 * Se o usuário não for um administrador, retorna um erro de acesso negado.
 *
 * @param req - Objeto da requisição HTTP.
 * @param res - Objeto da resposta HTTP.
 * @param next - Função de callback para passar o controle para o próximo middleware.
 */

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as { tipoConta: string };

  if (user.tipoConta === 'admin') {
    next();
  } else {
    res.status(403).json({
      error:
        'Acesso negado. Apenas administradores podem realizar essa operação.'
    });
  }
}
