declare namespace NodeJS {
    export type ProcessEnv = {
        PORT: number;
        DATABASE_URL: string;
        NODE_ENV: 'development' | 'production';
        SALTROUNDS: number;
    }

}