
const placementDateEnd: Bot = {
  name: 'Placement dateEnd',
  botType: 'POSTSAVE',
  isEnabled: true,
  onUpdate: true,
  entity: 'Placement',
  botConditionData: {
    botConditions: [
      {
        entity: 'Placement',
        field: 'dateEnd',
        matchOperator: 'ISUPDATED',
      },
    ],
    logicOperator: 'AND',
  },
  botOutcomes: [
    {
      outcomeType: 'UPDATEENTITY',
      entity: 'Candidate',
      data: {
        dateAvailable: '$dateEnd+1',
      },
    },
  ],
};

export default placementDateEnd;
