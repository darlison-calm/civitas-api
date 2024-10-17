import * as bcrypt from 'bcrypt';

/**
 * Criptografa a senha fornecida usando o algoritmo bcrypt.
 * @param senhaPlana - A senha não criptografada.
 * @returns A senha criptografada.
 */
export async function criptografarSenha(senhaPlana: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(senhaPlana, saltRounds);
}

/**
 * Compara uma senha fornecida com uma senha criptografada para verificar se correspondem.
 * @param senhaPlana - A senha não criptografada fornecida pelo usuário.
 * @param senhaCriptografada - A senha criptografada armazenada no banco de dados.
 * @returns `true` se as senhas correspondem, `false` caso contrário.
 */
export async function compararSenha(
  senhaPlana: string,
  senhaCriptografada: string
): Promise<boolean> {
  return await bcrypt.compare(senhaPlana, senhaCriptografada);
}

/**
 * Decorator que criptografa a senha de um campo antes de inserir ou atualizar um registro.
 * @returns O método decorado que criptografa a senha antes de inseri-la no banco de dados.
 */
export function CriptografarSenhaAntesDeInserir(): MethodDecorator {
  return function (target: object, propertyKey: string | symbol) {
    const original = target[propertyKey];

    target[propertyKey] = async function (...args: unknown[]) {
      if (this.senha) {
        this.senha = await criptografarSenha(this.senha);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return original && original.apply(this, args as any[]);
    };
  };
}

/**
 * Valida se a senha atende aos critérios de segurança:
 * - Deve conter 8 caracteres.
 * - Deve conter pelo menos uma letra maiúscula.
 * - Deve conter pelo menos um caractere especial.
 * @param senha - A senha a ser validada.
 * @returns `true` se a senha atender aos critérios, `false` caso contrário.
 */
export function validarSenha(senha: string): boolean {
  const tem8Caracteres = senha.length === 8;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  return tem8Caracteres && temMaiuscula && temCaractereEspecial;
}
