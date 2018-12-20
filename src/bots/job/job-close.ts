
const closeJob: Bot = {
  name: 'Job Closed',
  botType: 'POSTSAVE',
  isEnabled: true,
  onUpdate: true,
  entity: 'JobOrder',
  botConditionData: {
    botConditions: [
      {
        entity: 'JobOrder',
        field: 'status',
        matchOperator: 'EQUALS',
        value: 'Closed',
      },
    ],
    logicOperator: 'AND',
  },
  botOutcomes: [
    {
      outcomeType: 'UPDATEENTITY',
      data: {
        isOpen: false,
      },
      entity: 'JobOrder',
    },
  ],
};

export default closeJob;
