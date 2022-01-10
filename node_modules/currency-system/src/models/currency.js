const {
    Schema,
    model
  } = require("mongoose");
  
    module.exports = model('currency', new Schema({
      userID: String,
      guildID: String,
      inventory: Array,
      wallet: { type: Number, default: 0 },
      bank: { type: Number, default: 0 },
      networth: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: new Date() },
      lastGamble: { type: Number, default: 0 },
      lastHourly: { type: Number, default: 0 },
      lastQuaterly: { type: Number, default: 0 },
      lastHafly: { type: Number, default: 0 },
      lastRob: { type: Number, default: 0 },
      lastDaily: { type: Number, default: 0 },
      lastWeekly: { type: Number, default: 0 },
      lastMonthly: { type: Number, default: 0 },
      lastBegged: { type: Number, default: 0 },
      lastWork: { type: Number, default: 0 },
      bankSpace: { type: Number, default: 0 }
    }));
