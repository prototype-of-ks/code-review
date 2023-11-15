import { commentsOnPR } from './common/ci/github/commentsOnPR';
import AIClient from './common/model/AIClient';

export const main = async () => {
  // commentsOnPR('This is default comments');
  // const client = new AIClient({
  //   external: true
  // });
  // const feedbacks = await client.callModel('What time is it now?');
  // console.log('feedbacks => ', feedbacks);

  await commentsOnPR('this is comments');
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
