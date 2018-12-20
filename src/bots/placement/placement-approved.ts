
const placementApproved: Bot = {
  name: 'Placement Approved',
  botType: 'POSTSAVE',
  isEnabled: true,
  onUpdate: true,
  entity: 'Placement',
  botConditionData: {
    botConditions: [
      {
        entity: 'Placement',
        field: 'status',
        matchOperator: 'EQUALS',
        value: 'Approved',
      },
    ],
  },
  botOutcomes: [
    {
      outcomeType: 'UPDATEENTITY',
      entity: 'Candidate',
      data: {
        status: 'Placed',
      },
    },
    {
      outcomeType: 'WEBHOOK',
      url: 'https://us-central1-engage-shifts.cloudfunctions.net/sendToSlack',
      httpMethod: 'POST',
      queryParams: {
        entity: 'Placement',
        entityId: '$id',
        status: '$status',
        candidate: '$candidate.name',
        job: '$jobOrder.title',
        startDate: '$dateBegin',
      },
    },
  ],
};

export default placementApproved;
