import { getOctokit as go } from '@actions/github';
import { getGithubEnvVariables } from '../../../config';

export const getOctokit = () => {
  const { githubToken } = getGithubEnvVariables();

  return go(githubToken);
};
