export enum GithubEnvVariables {
    GITHUB_TOKEN = 'GITHUB_TOKEN',
    GITHUB_SHA = 'GITHUB_SHA',
    BASE_SHA = 'BASE_SHA'
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
        baseSha: process.env[GithubEnvVariables.BASE_SHA] ?? ''
    }
};