import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  createTestUser() {
    return Meteor.users.insertAsync({});
  },
});

Accounts.registerLoginHandler('testLogin', async (request) => {
  if (!(typeof request.userId === 'string')) {
    return undefined;
  }
  const user = await Meteor.users.findOneAsync(request.userId);

  if (!user) {
    return { error: new Meteor.Error('USER_NOT_FOUND') };
  }
  return { userId: user._id };
});
