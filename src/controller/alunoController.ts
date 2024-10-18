// src/controllers/AlunoController.ts
import { Request, Response } from 'express';
import { AlunoService } from '../services/alunoService'; // Certifique-se de que o caminho está correto

export class AlunoController {
    private readonly alunoService: AlunoService;

    constructor() {
        this.alunoService = new AlunoService();
    }

    async cadastrar(req: Request, res: Response): Promise<void> {
        try {
            const aluno = await this.alunoService.cadastrarAluno(req.body);
            res.status(201).json({ message: 'Aluno cadastrado com sucesso', aluno });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar aluno', error });
        }
    }
}

