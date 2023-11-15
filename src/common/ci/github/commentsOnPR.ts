import { context } from '@actions/github';
import { getOctokit } from './getOctokit';
import { getChangedFiles } from '../../git/getChangedFiles';

const octokit = getOctokit();

export const commentsOnPR = async (comment: string) => {
  try {
    const { payload, issue } = context;
    const { commits, files } = await getChangedFiles();

    if (!payload.pull_request) {
      return console.error('Not a pull request. Skipping commenting on PR...');
    }
    const { owner, repo, number: pull_number } = issue;

    const file = files[1];
    const patch = file.patch;

    if (patch) {
      await octokit.rest.pulls.createReviewComment({
        owner,
        repo,
        pull_number,
        commit_id: commits[commits.length - 1].sha,
        body: comment,
        path: file.filename,
        position: patch.split('\n').length - 1,
      });
    }

  } catch (error) {
    console.error(error);
  }
};
