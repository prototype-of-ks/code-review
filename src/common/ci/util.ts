import { getGithubEnvVariables, githubToken } from '../../config';


export const getToken = () => {
    const { githubToken } = getGithubEnvVariables();

    if (!githubToken) {
        console.warn('GITHUB_TOKEN is not set')
    }

    return githubToken;
};