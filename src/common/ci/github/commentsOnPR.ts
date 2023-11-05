import { context, getOctokit } from '@actions/github';
import { getToken } from '../util';

export const commentsOnPR = async (comment: string) => {
  try {
    const githubToken = getToken();
    const { payload, issue } = context;

    if (!payload.pull_request) {
      return console.error('Not a pull request. Skipping commenting on PR...');
    }

    const octokit = getOctokit(githubToken);
    const { owner, repo, number: pull_number } = issue;

    const { data: comments } = await octokit.rest.issues.listComments({
      owner,
      issue_number: pull_number,
      repo,
    });

    const { data: commentResult } = await octokit.rest.issues.createComment({
      owner,
      issue_number: pull_number,
      repo,
      body: comment
    });

    // const botComment = comments.find((comment) =>
    //   comment.body?.includes(signOff)
    // );

    console.log('[comment => ]', comment);
    console.log('[comments => ]', comments);
    console.log('[create comments result => ]', commentResult);

  } catch (error) {
    console.log(error);
  }
};
