const db = require("mongoose");
const cs = require("../models/currency");
const inv = require('../models/inventory');
const event = new(require('events').EventEmitter)();
let wallet;
let bank;
let maxBank;
let maxWallet;
let defaultBankLimit;

// ===================================================================
function setDefaultBankLimitForUser(amount) {
    if (parseInt(amount)) defaultBankLimit = amount || 0;
}
// ===================================================================
function setDefaultWalletAmount(amount) {
    if (parseInt(amount)) wallet = amount || 0;
}
// ===================================================================
function setDefaultBankAmount(amount) {
    if (parseInt(amount)) bank = amount || 0;
}
// ===================================================================
function setMaxBankAmount(amount) {
    if (parseInt(amount)) maxBank = amount || 0;
}
// ===================================================================
function setMaxWalletAmount(amount) {
    if (parseInt(amount)) maxWallet = amount || 0;
}
// ===================================================================
function connect(that) {
    let connected = true;
    db.connect(that, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(e => {
        connected = false;
        throw new TypeError(`${e}`);
    }).then(() => {
        if (connected === true) console.info("Connected to DB successfully.")
    });
};
// ===================================================================
function amount(data, type = 'add', where = 'wallet', amount) {
    if (!data.bankSpace) data.bankSpace = maxBank || 0;

    if (where === 'bank') {
        if (type === 'add') data.bank += amount;
        else data.bank -= amount;
    } else {
        // data.bank += amount;
        // if ((data.wallet - amount) < 0) {
        //     const a = data.wallet;
        //     data.wallet = 0;
        //     data.bank -= Number(String(a - amount).replace("-", ''));
        // } else data.bank -= amount;
        // data.wallet -= amount;
        if (type === 'add') data.wallet += amount;
        else data.wallet -= amount;
    };
    if (data.bankSpace > 0 && data.bank > data.bankSpace) {
        console.log('so bank is more.')
        const a = data.bank;
        data.bank = data.bankSpace;
        data.wallet += Number(String(a - data.bankSpace).replace("-", ''));
        console.log(data)
    } else {
        if (maxBank > 0 && data.bank > maxBank) data.bank = maxBank;
    }
    if (maxWallet > 0 && data.wallet > maxWallet) data.wallet = maxWallet;
    if (!data.networth) data.networth = 0;
    data.networth = data.bank + data.wallet;
    return data;
};
// ===================================================================
async function setBankSpace(userID, guildID, newAmount) {
    let data = await findUser({}, userID, guildID)
    newAmount = parseInt(newAmount);
    if (newAmount === 0) newAmount = 'zero';
    if (!newAmount) return {
        error: true,
        type: 'no-amount-provided'
    };
   

    data.bankSpace = newAmount.replace('zero', 0);
    await saveUser(data);
    return {
        error: false,
        type: 'success',
        amount: newAmount.replace('zero', 0)
    };
}
// ===================================================================
async function gamble(settings) {

    let data = await findUser(settings)

    const money = settings.amount;
    const result = Math.floor(Math.random() * 10);
    const balance = data.wallet;
    let lastGamble = data.lastGamble;
    let cooldown = settings.cooldown || 50;
    if (!parseInt(money)) return {
        error: true,
        type: 'amount'
    };
    if (isNaN(parseInt(money))) return {
        error: true,
        type: 'nan'
    };
    if (parseInt(money) > balance || !balance || balance === 0) return {
        error: true,
        type: 'low-money',
        neededMoney: balance - parseInt(money)
    };
    if (parseInt(money) < settings.minAmount || 0) return {
        error: true,
        type: 'gamble-limit',
        minAmount: settings.minAmount || 0
    };
    if (lastGamble !== null && cooldown - (Date.now() - lastGamble) / 1000 > 0) return {
        error: true,
        type: 'time',
        second: parseSeconds(Math.floor(cooldown - (Date.now() - lastGamble) / 1000))
    };

    if (result <= 5) {
        data.lastGamble = Date.now();
        data = amount(data, 'remove', 'wallet', parseInt(money))
        await saveUser(data);
        return {
            error: false,
            type: 'lost',
            amount: parseInt(money),
            wallet: data.wallet
        };
    } else if (result > 5) {
        data.lastGamble = Date.now();

        data = amount(data, 'add', 'wallet', parseInt(money));

        await saveUser(data);
        return {
            error: false,
            type: 'won',
            amount: parseInt(money),
            wallet: data.wallet
        };
    };
};
// ===================================================================
async function withdraw(settings) {
    let data = await findUser(settings)

    const money = settings.amount;
    const bank = data.bank;
    /*
        if (money !== "all" || money !== "max" || isNan(money)) return {
            error: true,
            type: 'money'
        };
    */
    if (!money) return {
        error: true,
        type: 'money'
    };
    if (money.includes('-')) return {
        error: true,
        type: 'negative-money'
    };


    if (money === 'all' || money === 'max') {
        if (bank === 0) return {
            error: true,
            type: 'no-money'
        };
        if (settings.amount > data.bank) return {
            error: true,
            type: 'low-money'
        }
        data.wallet += data.bank;
        data.bank = 0;
        if (maxWallet > 0 && data.wallet > maxWallet) {
            const a = data.wallet - maxWallet;
            if (a > 0) data.bank += a;
            data.wallet = maxWallet
        };
        if (maxBank > 0 && data.bank > maxBank) {
            const a = data.bank - maxBank;
            if (a > 0) {
                if (data.wallet !== maxWallet) data.wallet += a;
            }
            data.bank = maxBank
        };

        if (!data.networth) data.networth = 0;
        data.networth = data.bank + data.wallet;
        await saveUser(data);
        return {
            error: false,
            type: 'all-success'
        }

    } else {
        if (bank < parseInt(money)) return {
            error: true,
            type: 'low-money'
        };
        if (isNaN(settings.amount)) return {
            error: true,
            type: 'money'
        }

        if (parseInt(settings.amount) > data.bank) return {
            error: true,
            type: 'low-money'
        }

        data.wallet += parseInt(settings.amount)
        data.bank -= parseInt(settings.amount)

        await saveUser(data);
        return {
            error: false,
            type: 'success',
            amount: settings.amount
        }

        data.wallet += data.bank;
        data.bank = 0;
        if (maxWallet > 0 && data.wallet > maxWallet) {
            const a = data.wallet - maxWallet;
            if (a > 0) data.bank += a;
            data.wallet = maxWallet
        };
        if (maxBank > 0 && data.bank > maxBank) {
            const a = data.bank - maxBank;
            if (a > 0) {
                if (data.wallet !== maxWallet) data.wallet += a;
            }
            data.bank = maxBank
        };

        if (!data.networth) data.networth = 0;
        data.networth = data.bank + data.wallet;
        await saveUser(data);
        return {
            error: false,
            type: 'success',
            amount: parseInt(money)
        };
    }
};
// ===================================================================
async function deposite(settings) {
    let data = await findUser(settings);

    const money = settings.amount;
    const wallet = data.wallet;

    if (!money) return {
        error: true,
        type: 'money'
    };
    if (String(money).includes('-')) return {
        error: true,
        type: 'negative-money'
    };


    if (money === 'all' || money === 'max') {

        if (wallet === 0) return {
            error: true,
            type: 'no-money'
        };
        data.bank += data.wallet;
        data.wallet = 0;
        if (maxWallet > 0 && data.wallet > maxWallet) {
            const a = data.wallet - maxWallet;
            if (a > 0) data.bank += a;
            data.wallet = maxWallet
        };
        if (maxBank > 0 && data.bank > maxBank) {
            const a = data.bank - maxBank;
            if (a > 0) {
                if (data.wallet !== maxWallet) data.wallet += a;
            }
            data.bank = maxBank
        };

        if (!data.networth) data.networth = 0;
        data.networth = data.bank + data.wallet;
        if (data.bankSpace > 0 && data.bank > data.bankSpace) {
            const a = data.bank;
            data.bank = data.bankSpace;
            data.wallet += Number(String(a - data.bankSpace).replace("-", ''));
        } else {
            if (maxBank > 0 && data.bank > maxBank) data.bank = maxBank;
        }
        await saveUser(data);
        return {
            error: false,
            type: 'all-success'
        };


    } else {
        if (parseInt(money) > wallet) return {
            error: true,
            type: 'low-money'
        };

        data.bank += settings.amount;

        if ((data.wallet - settings.amount) < 0) {
            const a = data.wallet;
            data.wallet = 0;
            data.bank -= Number(String(a - settings.amount).replace("-", ''));
        } else data.bank -= settings.amount;

        data.wallet -= settings.amount;

        if (!data.networth) data.networth = 0;
        data.networth = data.bank + data.wallet;

        if (data.bankSpace > 0 && data.bank > data.bankSpace) {
            const a = data.bank;
            data.bank = data.bankSpace;
            data.wallet += Number(String(a - data.bankSpace).replace("-", ''));
        } else {
            if (maxBank > 0 && data.bank > maxBank) data.bank = maxBank;
        }
        await saveUser(data);
        return {
            error: false,
            type: 'success',
            amount: settings.amount
        };

    }
};
// ===================================================================
async function balance(settings) {
    let data = await findUser(settings)
    if (!data.networth) data.networth = 0;
    data.networth = data.wallet + data.bank;
    return {
        rawData: data,
        bank: data.bank,
        wallet: data.wallet,
        networth: data.networth
    }
};
// ===================================================================
async function leaderboard(guildid) {
    let data = await cs.find({
        guildID: guildid || null
    });
    data.sort((a, b) => {
        return b.networth - a.networth
    })
    return data;
};
// ===================================================================
async function globalLeaderboard() {

    let array = await cs.find();
    var output = [];
    array.forEach(function (item) {
        var existing = output.filter(function (v, i) {
            return v.userID == item.userID;
        });
        if (existing.length) {
            var existingIndex = output.indexOf(existing[0]);
            output[existingIndex].bank = output[existingIndex].bank + item.bank
            output[existingIndex].wallet = output[existingIndex].wallet + item.wallet
        } else {
            output.push(item);
        }
    });
    output.sort((a, b) => {
        return b.networth - a.networth
    })
    return output;
};
// ===================================================================
async function work(settings) {
    let data = await findUser(settings)

    let lastWork = data.lastWork;
    let timeout = settings.cooldown;
    if (lastWork !== null && timeout - (Date.now() - lastWork) / 1000 > 0) return {
        error: true,
        type: 'time',
        time: parseSeconds(Math.floor(timeout - (Date.now() - lastWork) / 1000))
    };
    else {

        let amountt = Math.floor(Math.random() * settings.maxAmount || 100) + 1;
        data.lastWork = Date.now();
        data = amount(data, 'add', 'wallet', amountt);
        await saveUser(data);
        let result = Math.floor((Math.random() * settings.replies.length));
        return {
            error: false,
            type: 'success',
            workType: settings.replies[result],
            amount: amountt
        };

    };
};
// ===================================================================
async function monthly(settings) {
    let data = await findUser(settings)

    let monthly = data.lastMonthly;
    let timeout = 2.592e+6;
    if (monthly !== null && timeout - (Date.now() - monthly) / 1000 > 0) return {
        error: true,
        type: 'time',
        time: parseSeconds(Math.floor(timeout - (Date.now() - monthly) / 1000))
    };
    else {
        data.lastMonthly = Date.now();
        data = amount(data, 'add', 'wallet', settings.amount);

        await saveUser(data);

        return {
            error: false,
            type: 'success',
            amount: settings.amount
        };

    };
};
// ===================================================================
async function weekly(settings) {
    let data = await findUser(settings)

    let weekly = data.lastWeekly;
    let timeout = 604800;
    if (weekly !== null && timeout - (Date.now() - weekly) / 1000 > 0) return {
        error: true,
        type: 'time',
        time: parseSeconds(Math.floor(timeout - (Date.now() - weekly) / 1000))
    };
    else {
        data.lastWeekly = Date.now();
        data = amount(data, 'add', 'wallet', settings.amount);
        await saveUser(data);

        return {
            error: false,
            type: 'success',
            amount: settings.amount
        };

    };
};
// ===================================================================
async function quaterly(settings) {
    let data = await findUser(settings)

    let quaterly = data.lastQuaterly;
    let timeout = 21600;
    if (quaterly !== null && timeout - (Date.now() - quaterly) / 1000 > 0) return {
        error: true,
        type: 'time',
        time: parseSeconds(Math.floor(timeout - (Date.now() - quaterly) / 1000))
    };
    else {
        data.lastQuaterly = Date.now();
        data = amount(data, 'add', 'wallet', settings.amount);
        await saveUser(data);

        return {
            error: false,
            type: 'success',
            amount: settings.amount
        };

    };
};
// ===================================================================
async function hafly(settings) {
    let data = await findUser(settings)

    let hafly = data.lastHafly;
    let timeout = 43200;
    if (hafly !== null && timeout - (Date.now() - hafly) / 1000 > 0) return {
        error: true,
        type: 'time',
        time: parseSeconds(Math.floor(timeout - (Date.now() - hafly) / 1000))
    };
    else {
        data.lastHafly = Date.now();
        data = amount(data, 'add', 'wallet', settings.amount);
        await saveUser(data);

        return {
            error: false,
            type: 'success',
            amount: settings.amount
        };
    };
};
// ===================================================================
async function daily(settings) {
    let data = await findUser(settings)

    let daily = data.lastDaily;
    let timeout = 86400;
    if (daily !== null && timeout - (Date.now() - daily) / 1000 > 0) return {
        error: true,
        type: 'time',
        time: parseSeconds(Math.floor(timeout - (Date.now() - daily) / 1000))
    };
    else {
        data.lastDaily = Date.now();
        data = amount(data, 'add', 'wallet', settings.amount);
        await saveUser(data);

        return {
            error: false,
            type: 'success',
            amount: settings.amount
        };

    };
};
// ===================================================================
async function hourly(settings) {
    let data = await findUser(settings)

    let lastHourly = data.lastHourly;
    let timeout = 3600;
    if (lastHourly !== null && timeout - (Date.now() - lastHourly) / 1000 > 0) return {
        error: true,
        type: 'time',
        time: parseSeconds(Math.floor(timeout - (Date.now() - lastHourly) / 1000))
    };
    else {
        data.lastHourly = Date.now();
        data = amount(data, 'add', 'wallet', settings.amount);
        await saveUser(data);

        return {
            error: false,
            type: 'success',
            amount: settings.amount
        };

    };
};
// ===================================================================
async function rob(settings) {
    if (!settings.guild) settings.guild = {
        id: null
    }
    let user1 = await findUser(settings)

    let user2 = await cs.findOne({
        userID: settings.user2.id,
        guildID: settings.guild.id || null
    });
    if (!user2) user2 = await makeUser(settings, true)

    let lastRob = user1.lastRob;
    let timeout = settings.cooldown;

    if (lastRob !== null && timeout - (Date.now() - lastRob) / 1000 > 0) return {
        error: true,
        type: 'time',
        time: parseSeconds(Math.floor(timeout - (Date.now() - lastRob) / 1000))
    };

    if (user1.wallet < (settings.minAmount - 2)) return {
        error: true,
        type: 'low-money',
        minAmount: settings.minAmount
    };
    if (user2.wallet < (settings.minAmount - 2)) return {
        error: true,
        type: 'low-wallet',
        user2: settings.user2,
        minAmount: settings.minAmount
    };
    let max = settings.maxRob;
    if (!max || max < 1000) max = 1000
    let random = Math.floor(Math.random() * (Math.floor(max || 1000) - 99)) + 99
    if (random > user2.wallet) random = user2.wallet;
    user1.lastRob = Date.now();
    // 5 here is percentage of success.
    if (testChance(settings.successPercentage || 5)) {
        // Success!
        user2 = amount(user2, 'remove', 'wallet', random);
        user1 = amount(user1, 'add', 'wallet', random);

        await saveUser(user1, user2);
        return {
            error: false,
            type: 'success',
            user2: settings.user2,
            minAmount: settings.minAmount,
            amount: random
        };

    } else {
        // Fail :(
        if (random > user1.wallet) random = user1.wallet;
        user2 = amount(user2, 'add', 'wallet', random);
        user1 = amount(user1, 'remove', 'wallet', random);
        await saveUser(user1, user2);
        return {
            error: true,
            type: 'caught',
            user2: settings.user2,
            minAmount: settings.minAmount,
            amount: random
        };
    };

};
// ===================================================================
async function beg(settings) {
    let data = await findUser(settings)

    let beg = data.lastBegged; // XDDDD
    let timeout = 240;
    if (parseInt(settings.cooldown)) timeout = parseInt(settings.cooldown);
    if (beg !== null && timeout - (Date.now() - beg) / 1000 > 0) return {
        error: true,
        type: 'time',
        time: parseSeconds(Math.floor(timeout - (Date.now() - beg) / 1000))
    };
    else {
        const amountt = Math.round((settings.minAmount || 200) + Math.random() * (settings.maxAmount || 400));
        data.lastBegged = Date.now();
        data = amount(data, 'add', 'wallet', amountt);
        await saveUser(data);

        return {
            error: false,
            type: 'success',
            amount: amountt
        };

    };
};
// ===================================================================
async function addMoney(settings) {
    let data = await findUser(settings);
    if (String(settings.amount).includes("-")) return {
        error: true,
        type: 'negative-money'
    };
    let amountt = parseInt(settings.amount) || 0;
    if (settings.wheretoPutMoney === "bank") data = amount(data, 'add', 'bank', amountt);
    else data = amount(data, 'add', 'wallet', amountt);


    await saveUser(data);
    return {
        error: false,
        type: 'success',
        rawData: data
    };
};
// ===================================================================
async function removeMoney(settings) {
    let data = await findUser(settings)
    if (String(settings.amount).includes("-")) return {
        error: true,
        type: 'negative-money'
    };
    if (settings.wheretoPutMoney === "bank") {
        if (settings.amount === 'all' || settings.amount === "max") data.bank = 0;
        else data = amount(data, 'remove', 'bank', parseInt(settings.amount) || 0);
    } else {
        if (settings.amount === 'all' || settings.amount === "max") data.wallet = 0;
        else data = amount(data, 'remove', 'wallet', parseInt(settings.amount) || 0);
    }

    await saveUser(data);
    return {
        error: false,
        type: 'success',
        rawData: data
    };
};
// ===================================================================
async function info(userID, guildID) {
    let data = await findUser({}, userID, guildID)

    let lastHourlyy = true;
    let lastHaflyy = true;
    let lastDailyy = true;
    let lastWeeklyy = true;
    let lastMonthlyy = true;
    let lastBeggedy = true;
    let lastQuaterlyy = true;
    if (data.lastBegged !== null && 240 - (Date.now() - data.lastBegged) / 1000 > 0) lastBeggedy = false;
    if (data.lastHourly !== null && 3600 - (Date.now() - data.lastHourly) / 1000 > 0) lastHourlyy = false;
    if (data.lastDaily !== null && 86400 - (Date.now() - data.lastDaily) / 1000 > 0) lastDailyy = false;
    if (data.lastHafly !== null && 43200 - (Date.now() - data.lastHafly) / 1000 > 0) lastHaflyy = false;
    if (data.lastQuaterly !== null && 12600 - (Date.now() - data.lastQuaterly) / 1000 > 0) lastQuaterlyy = false;
    if (data.lastWeekly !== null && 604800 - (Date.now() - data.lastWeekly) / 1000 > 0) lastWeeklyy = false;
    if (data.lastMonthly !== null && 2.592e+6 - (Date.now() - data.lastMonthly) / 1000 > 0) lastMonthlyy = false;
    return {
        error: false,
        rawData: data,
        info: Object.entries({
            Hourly: {
                used: lastHourlyy,
                timeLeft: parseSeconds(Math.floor(3600 - (Date.now() - data.lastHourly) / 1000))
            },
            Hafly: {
                used: lastHaflyy,
                timeLeft: parseSeconds(Math.floor(43200 - (Date.now() - data.lastHafly) / 1000))
            },
            Daily: {
                used: lastDailyy,
                timeLeft: parseSeconds(Math.floor(86400 - (Date.now() - data.lastDaily) / 1000))
            },
            Weekly: {
                used: lastWeeklyy,
                timeLeft: parseSeconds(Math.floor(604800 - (Date.now() - data.lastWeekly) / 1000))
            },
            Monthly: {
                used: lastMonthlyy,
                timeLeft: parseSeconds(Math.floor(2.592e+6 - (Date.now() - data.lastMonthly) / 1000))
            },
            Begged: {
                used: lastBeggedy,
                timeLeft: parseSeconds(Math.floor(240 - (Date.now() - data.lastBegged) / 1000))
            },
            Quaterly: {
                used: lastQuaterlyy,
                timeLeft: parseSeconds(Math.floor(12600 - (Date.now() - data.lastQuaterly) / 1000))
            }
        })
    }
}
// ===================================================================
async function transferMoney(settings) {
    if (!settings.guild) settings.guild = {
        id: null
    }
    let user1 = await findUser(settings)

    let user2 = await cs.findOne({
        userID: settings.user2.id,
        guildID: settings.guild.id || false
    });
    if (!user2) user2 = await makeUser(settings, true)
    let money = parseInt(settings.amount)
    if (user1.wallet < money) return {
        error: true,
        type: 'low-money'
    };
    user1 = amount(user1, 'remove', 'wallet', money);
    user2 = amount(user2, 'add', 'wallet', money);
    await saveUser(user1, user2);
    return {
        error: false,
        type: 'success',
        money: money,
        user2: settings.user2,
        rawData: user1,
        rawData1: user2
    };
};
// ===================================================================
async function getUserItems(settings) {
    let data = await findUser(settings)
    return {
        error: false,
        inventory: data.inventory,
        rawData: data
    };
};
// ===================================================================
async function getShopItems(settings) {
    let data = await getInventory(settings)
    if (!data) data = await makeInventory(settings);
    return {
        error: false,
        inventory: data.inventory,
        rawData: data
    };
};

// ===================================================================
function parseSeconds(seconds) {
    if (String(seconds).includes('-')) return '0 Seconds'
    let days = parseInt(seconds / 86400);
    seconds = seconds % 86400;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);

    if (days) {
        return `${days} day, ${hours} hours, ${minutes} minutes`
    } else if (hours) {
        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
    } else if (minutes) {
        return `${minutes} minutes, ${seconds} seconds`
    }

    return `${seconds} second(s)`
};
// ===================================================================
// This is for Rob Command
function testChance(successPercentage) {
    let random2 = Math.random() * 10;
    return ((random2 -= successPercentage) < 0);
};
// Basic Functions
// ===================================================================
async function findUser(settings, uid, gid) {
    if (!settings.guild) settings.guild = {
        id: null
    }
    let find = await cs.findOne({
        userID: uid || settings.user.id,
        guildID: gid || settings.guild.id || null
    });
    if (!find) find = await makeUser(settings, false, uid, gid)
    if (defaultBankLimit > 0 && find.bankSpace == 0) find.bankSpace = defaultBankLimit;
    return find;
};
// ===================================================================
async function getInventory(settings) {
    if (!settings.guild) settings.guild = {
        id: null
    }
    let find = await inv.findOne({
        guildID: settings.guild.id || null
    });
    return find;
};
// ===================================================================
async function makeInventory(settings) {
    if (!settings.guild) settings.guild = {
        id: null
    }
    const inventory = new inv({
        guildID: settings.guild.id || null,
        inventory: []
    });
    await saveUser(inventory);
    return inventory;
};
// ===================================================================
async function makeUser(settings, user2 = false, uid, gid) {
    if (!settings.guild) settings.guild = {
        id: null
    }
    let user = uid || settings.user.id
    if (user2) user = settings.user2.id;
    const newUser = new cs({
        userID: user,
        guildID: gid || settings.guild.id || null,
        wallet: wallet || 0,
        bank: bank || 0,
        bankSpace: defaultBankLimit || 0
    });
    if (!newUser) throw new Error('Missing data to fetch from DB. (A function in Currency System is used and userID/guildID wasn\'t provided.)')
    await saveUser(newUser);
    return newUser;

};
// ===================================================================
async function saveUser(data, data2) {
    // this will prevent error
    // ParallelSaveError: Can't save() the same doc multiple times in parallel.
    await sleep(Math.floor((Math.random() * 10) + 1) * 100) // 100 - 1000 random  Number generator
    await data.save(function (err) {
        if (err) throw err;
    });
    if (data2) {
        await sleep(Math.floor((Math.random() * 10) + 1) * 100) // 100 - 1000 random  Number generator
        await data2.save(function (err) {
            if (err) throw err;
        });
    }
};

// ===================================================================
function updateInventory(mongoURL, newData, settings, collection = "inventory-currencies") {
    event.emit('debug', `[ CS => Debug ] : UpdateInventory function is executed.`)
    if (!settings.guild) settings.guild = {
        id: null
    };
    let query = {
        guildID: settings.guild.id || null,
    };
    if (settings.user) query = {
        userID: settings.user.id,
        guildID: settings.guild.id || null,
    }
    new(require('mongodb').MongoClient)(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).connect(function (err, db) {
        if (err) return event.emit('debug', `[ CS => Error ] : Unable To Connect to MongoDB ( updateInventory Function )`, err)

        event.emit('debug', `[ CS => Debug ] : Connected to MongoDB ( updateInventory Function )`);
        db.db(mongoURL.split('/')[mongoURL.split('/').length - 1]).collection(collection).updateOne(query, {
            $set: {
                inventory: newData
            }
        }, function (err, res) {
            // console.log(res || 'No RES')
            // console.log(err || 'No ERR')
            if (err) return event.emit('debug', `[ CS => Error ] : Unable To Save Data to MongoDB ( updateInventory Function )`, err)
            if (res.nModified) event.emit('debug', `[ CS => Debug ] : Successfully Saved Data ( updateInventory Function )`);
            else event.emit('debug', `[ CS => Error ] : MongoDB Didn't Update the DB. ( updateInventory Function )`);
            db.close();
            event.emit('debug', `[ CS => Debug ] : Closing DB  ( updateInventory Function )`)
        });
    });
};

// ===================================================================
function sleep(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
};

// ===================================================================
function searchForNewUpdate(state = true) {
    if (state) _checkUpdate();
}
// ===================================================================
// colors : https://github.com/shiena/ansicolor/blob/master/README.md
async function _checkUpdate() {
    if (!require('node-fetch')) return;
    const packageData = await require('node-fetch')(`https://registry.npmjs.com/currency-system`).then(text => text.json())
    if (require('../../package.json').version !== packageData['dist-tags'].latest) {
        console.log('\n\n')
        console.log('\x1b[32m' + '---------------------------------------------------')
        console.log('\x1b[32m' + '| @ currency-system                        - [] X |')
        console.log('\x1b[32m' + '---------------------------------------------------')
        console.log('\x1b[33m' + `|            The module is\x1b[31m out of date!\x1b[33m           |`)
        console.log('\x1b[35m' + '|             New version is available!           |')
        console.log('\x1b[34m' + `|                ${require('../../package.json').version} --> ${packageData['dist-tags'].latest}                |`)
        console.log('\x1b[36m' + '|        Run "npm i currency-system@latest"       |')
        console.log('\x1b[36m' + '|                    to update!                   |')
        console.log('\x1b[37m' + `|          View the full changelog here:          |`)
        console.log('\x1b[31m' + '|         https://currency-system.js.org          |')
        console.log('\x1b[32m' + '---------------------------------------------------\x1b[37m')
        console.log('\n\n')

    }

}
// ===================================================================
module.exports = {
    setDefaultWalletAmount,
    setDefaultBankAmount,
    connect,
    gamble,
    withdraw,
    deposite,
    balance,
    leaderboard,
    globalLeaderboard,
    work,
    monthly,
    weekly,
    quaterly,
    hafly,
    daily,
    hourly,
    rob,
    beg,
    addMoney,
    removeMoney,
    transferMoney,
    getUserItems,
    getShopItems,
    findUser,
    makeUser,
    saveUser,
    getInventory,
    makeInventory,
    updateInventory,
    sleep,
    info,
    setMaxBankAmount,
    setMaxWalletAmount,
    setBankSpace,
    setDefaultBankLimitForUser,
    searchForNewUpdate
}
module.exports.cs = event;