export type Env = {
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
};

export function config(context: Env) {
  return {
    host: (context as Env).DATABASE_HOST,
    username: (context as Env).DATABASE_USERNAME,
    password: (context as Env).DATABASE_PASSWORD,
  };
}
