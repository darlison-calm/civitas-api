import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'minhaChaveSecreta'; // Defina isso no .env em produção

// Exportando a interface para que possa ser usada em outros arquivos
export interface JwtPayload {
  id: number;
  email: string;
  iat?: number; // Opcional: issued at
  exp?: number; // Opcional: expiration time
}

export const gerarToken = (payload: JwtPayload): string => {
  if (!payload.id || !payload.email) {
    throw new Error('Payload inválido');
  }
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verificarToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};
