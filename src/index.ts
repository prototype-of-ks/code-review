// const githubToken = process.env.GITHUB_TOKEN;
// const githubRepository = process.env.GITHUB_REPOSITORY;
// const githubSHA = process.env.GITHUB_SHA;
// const githubRef = process.env.GITHUB_REF;
// const githubEventPath = process.env.GITHUB_EVENT_PATH;

import { commentsOnPR } from './common/ci/github/commentsOnPR';

// console.log(`GITHUB_TOKEN: ${githubToken}`);
// console.log(`GITHUB_REPOSITORY: ${githubRepository}`);
// console.log(`GITHUB_SHA: ${githubSHA}`);
// console.log(`GITHUB_REF: ${githubRef}`);
// console.log(`GITHUB_EVENT_PATH: ${githubEventPath}`);

export const main = async () => {
  commentsOnPR('This is default comments');
};

main().catch(() => {
  process.exit(1);
});
