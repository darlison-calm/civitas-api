// src/middlewares/aluno.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const validarAluno = (req: Request, res: Response, next: NextFunction) => {
    const { nomeCompleto, rg, numeroMatricula, turma, cpfResponsavel, administradorId } = req.body;

    
    if (!nomeCompleto || !rg || !numeroMatricula || !turma || !cpfResponsavel || !administradorId) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    next();
};
