
const placementAdp: Bot = {
  name: 'Placement ADP',
  botType: 'POSTSAVE',
  isEnabled: true,
  onUpdate: true,
  entity: 'Placement',
  botConditionData: {
    botConditions: [
      {
        entity: 'Placement',
        field: 'payRate',
        matchOperator: 'ISUPDATED',
      },
      {
        entity: 'Placement',
        field: 'clientBillRate',
        matchOperator: 'ISUPDATED',
      },
    ],
    logicOperator: 'OR',
  },
  botOutcomes: [
    {
      outcomeType: 'UPDATEENTITY',
      entity: 'Candidate',
      data: {
        hourlyRate: '$payRate',
      },
    },
    {
      outcomeType: 'WEBHOOK',
      url: 'https://my-fake-adp.appspot.com/updateADP',
      httpMethod: 'POST',
      queryParams: {
        placementID: '$id',
        candidateID: '$candidate.id',
        candidateName: '$candidate.name',
        payRate: '$payRate',
        clientBillRate: '$clientBillRate',
        job: '$jobOrder.title',
      },
    },
  ],
};

export default placementAdp;
