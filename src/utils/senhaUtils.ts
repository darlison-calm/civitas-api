import * as bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';

// Função para criptografar a senha
export async function criptografarSenha(senhaPlana: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(senhaPlana, saltRounds);
}

// Função para comparar a senha
export async function compararSenha(senhaPlana: string, senhaCriptografada: string): Promise<boolean> {
    return await bcrypt.compare(senhaPlana, senhaCriptografada);
}

// Decorator para adicionar comportamento de criptografia de senha
export function CriptografarSenhaAntesDeInserir(): MethodDecorator {
    return function (target: any, propertyKey: string | symbol) {
        const original = target[propertyKey];

        target[propertyKey] = async function () {
            if (this.senha) {
                this.senha = await criptografarSenha(this.senha);
            }
            return original && original.apply(this);
        };

        BeforeInsert()(target, propertyKey);
    };
}