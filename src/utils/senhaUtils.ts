import * as bcrypt from 'bcrypt';

export async function criptografarSenha(senhaPlana: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(senhaPlana, saltRounds);
}

export async function compararSenha(
  senhaPlana: string,
  senhaCriptografada: string
): Promise<boolean> {
  return await bcrypt.compare(senhaPlana, senhaCriptografada);
}

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

export function validarSenha(senha: string): boolean {
  const tem8Caracteres = senha.length === 8;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  return tem8Caracteres && temMaiuscula && temCaractereEspecial;
}
