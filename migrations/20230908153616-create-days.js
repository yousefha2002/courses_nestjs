'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Create records for days
    const days = [
      { title: 'Monday' },
      { title: 'Tuesday' },
      { title: 'Wednesday' },
      { title: 'Thursday' },
      { title: 'Friday' },
      { title: 'Saturday' },
      { title: 'Sunday' },
    ];

    // Insert the records into the "Days" table
    await queryInterface.bulkInsert('Days', days, {});
  },

  down: async (queryInterface) => {
    // Remove the records created in the "up" method
    await queryInterface.bulkDelete('Days', null, {});
  },
};
