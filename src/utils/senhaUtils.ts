import * as bcrypt from 'bcrypt';
import { BeforeInsert } from 'typeorm';

/**
 * Função assíncrona que criptografa a senha com um hash seguro.
 * @param senhaPlana
 * @returns
 */
export async function criptografarSenha(senhaPlana: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(senhaPlana, saltRounds);
}

/**
 * Compara a senha em texto plano com a senha criptografada.
 * @param senhaPlana
 * @param senhaCriptografada
 * @returns
 */
export async function compararSenha(senhaPlana: string, senhaCriptografada: string): Promise<boolean> {
    return await bcrypt.compare(senhaPlana, senhaCriptografada);
}

/**
 * Método decorator que criptografa a senha de uma entidade antes de ser inserida no banco de dados.
 * Aplica o hash na senha caso ela exista antes de chamar o método original.
 * Utiliza o hook `BeforeInsert` do TypeORM para garantir que a criptografia
 * ocorra antes da inserção do registro.
 * @returns
 */
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