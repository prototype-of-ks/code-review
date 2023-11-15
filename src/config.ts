export enum GithubEnvVariables {
    GITHUB_TOKEN = 'GITHUB_TOKEN',
    GITHUB_SHA = 'GITHUB_SHA',
    BASE_SHA = 'BASE_SHA',
    HEAD_SHA = 'HEAD_SHA',
}

export enum AIEnvVariables {
    OPENAI_API_PROXY = 'OPENAI_API_PROXY',
    OPENAI_API_PROXY_KEY = 'OPENAI_API_PROXY_KEY',
}

export const githubToken = () => {
    const token = process.env[GithubEnvVariables.GITHUB_TOKEN];
    if (!token) {
        console.warn('GITHUB_TOKEN is not set')
    }
    return token ?? '';
};

export const getGithubEnvVariables = () => {
    return {
        githubToken: process.env[GithubEnvVariables.GITHUB_TOKEN] ?? '',
        githubSha: process.env[GithubEnvVariables.GITHUB_SHA] ?? '',
        baseSha: process.env[GithubEnvVariables.BASE_SHA] ?? '',
        headSha: process.env[GithubEnvVariables.HEAD_SHA] ?? '',
    }
};

export const getAIEnvVariables = () => {
    return {
        proxy: process.env[AIEnvVariables.OPENAI_API_PROXY],
        proxyAPIKey: process.env[AIEnvVariables.OPENAI_API_PROXY_KEY]
    };
};