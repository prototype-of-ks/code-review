import { context } from '@actions/github';
import { getGithubEnvVariables } from '../../config';
import { getOctokit } from '../ci/github/getOctokit';

export const getChangedFiles = async () => {
  const { baseSha, headSha } = getGithubEnvVariables();
  const octokit = getOctokit();
  const pull_request = context.payload.pull_request;
  const { issue } = context;
  const { owner, repo } = issue;

  if (!pull_request) {
    console.error(`No changed file.Maybe you should staged your file.`);
  }

  const comparedCommits = await octokit.rest.repos.compareCommits({
    owner,
    repo,
    base: baseSha,
    head: headSha,
  });

  const commits = comparedCommits.data.commits;
  const files = comparedCommits.data.files ?? [];

  return {
    files,
    commits,
  };
};
