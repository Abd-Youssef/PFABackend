const { Servey } = require("../model/servey");
const { Stat } = require("../model/stat");
const { User } = require("../model/user");

async function DailyStats(req, res) {
  const today = new Date(req.body.today);
  const todayFormatted = today.toISOString().substring(0, 10);

  try {
    let data = await Stat.findOne({ date: todayFormatted });

    const [
      connectionCount,
      accountsCreatedCount,
      serveyPosCount,
      serveyNegaCount,
    ] = await Promise.all([
      User.countDocuments({
        lastLogin: {
          $gte: new Date(todayFormatted),
          $lt: new Date(todayFormatted + "T23:59:59.999Z"),
        },
      }),
      User.countDocuments({
        createdAt: {
          $gte: new Date(todayFormatted),
          $lt: new Date(todayFormatted + "T23:59:59.999Z"),
        },
      }),
      Servey.countDocuments({
        date: {
          $gte: new Date(todayFormatted),
          $lt: new Date(todayFormatted + "T23:59:59.999Z"),
        },
        result: { $eq: 1 },
      }),
      Servey.countDocuments({
        date: {
          $gte: new Date(todayFormatted),
          $lt: new Date(todayFormatted + "T23:59:59.999Z"),
        },
        result: { $eq: 0 },
      }),
    ]);

    const updatedData = {
      period: "day",
      connections: connectionCount,
      accountsCreated: accountsCreatedCount,
      surveysPos: serveyPosCount,
      surveysNega: serveyNegaCount,
    };

    if (!data) {
      updatedData.date = todayFormatted;
    }

    const result = await Stat.findOneAndUpdate(
      { date: todayFormatted },
      updatedData,
      { upsert: true, setDefaultsOnInsert: true, new: true }
    );

    res.status(200).json({
      status: 200,
      message: "Daily stats calculated and updated!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

async function MonthlyStats(req, res) {
  try {
    const today = new Date(req.body.today);
    const lastMonthFirstDay = new Date(today.getFullYear(), today.getMonth());
    const FirstDayFormatted = lastMonthFirstDay.toISOString().substring(0, 10);
    const lastMonthLastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1
    );
    const LastDayFormatted = lastMonthLastDay.toISOString().substring(0, 10);

    const [
      connectionCount,
      accountsCreatedCount,
      serveyPosCount,
      serveyNegaCount,
    ] = await Promise.all([
      User.countDocuments({
        lastLogin: {
          $gte: new Date(FirstDayFormatted),
          $lt: new Date(LastDayFormatted + "T00:00:00.000Z"),
        },
      }),
      User.countDocuments({
        createdAt: {
          $gte: new Date(FirstDayFormatted),
          $lt: new Date(LastDayFormatted + "T00:00:00.000Z"),
        },
      }),
      Servey.countDocuments({
        date: {
          $gte: new Date(FirstDayFormatted),
          $lt: new Date(LastDayFormatted + "T00:00:00.000Z"),
        },
        result: { $eq: 1 },
      }),
      Servey.countDocuments({
        date: {
          $gte: new Date(FirstDayFormatted),
          $lt: new Date(LastDayFormatted + "T00:00:00.000Z"),
        },
        result: { $eq: 0 },
      }),
    ]);

    const updatedData = {
      date: LastDayFormatted,
      period: "month",
      connections: connectionCount,
      accountsCreated: accountsCreatedCount,
      surveysPos: serveyPosCount,
      surveysNega: serveyNegaCount,
    };

    const data = await Stat.findOneAndUpdate(
      { date: FirstDayFormatted, period: "month" },
      updatedData,
      { upsert: true, setDefaultsOnInsert: true, new: true }
    );

    res.status(200).json({
      status: 200,
      message: "Monthly stats calculated and updated!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

async function AllTimeStats(req, res) {
  try {
    const today = new Date(req.body.today);
    const todayFormatted = today.toISOString().substring(0, 10);

    const [
      connectionCount,
      accountsCreatedCount,
      serveyPosCount,
      serveyNegaCount,
    ] = await Promise.all([
      User.countDocuments({
        lastLogin: { $ne: null },
      }),
      User.countDocuments({
        createdAt: { $ne: null },
      }),
      Servey.countDocuments({
        result: { $eq: 1 },
      }),
      Servey.countDocuments({
        result: { $eq: 0 },
      }),
    ]);

    const updatedData = {
      date: todayFormatted,
      period: "allTime",
      connections: connectionCount,
      accountsCreated: accountsCreatedCount,
      surveysPos: serveyPosCount,
      surveysNega: serveyNegaCount,
    };

    const data = await Stat.findOneAndUpdate(
      { period: "allTime" },
      updatedData,
      { upsert: true, setDefaultsOnInsert: true, new: true }
    );

    res.status(200).json({
      status: 200,
      message: "All Time stats calculated and updated!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

async function WeeklyStats(req, res) {
  const today = new Date();
  const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
  const lastWeekFormatted = lastWeek.toISOString().substring(0, 10);
  const todayFormatted = today.toISOString().substring(0, 10);

  try {
    let data = await Stat.findOne({ date: lastWeekFormatted });

    const connectionCounts = [];
    const accountsCreatedCounts = [];
    const serveyPosCounts = [];
    const serveyNegaCounts = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const dateFormatted = date.toISOString().substring(0, 10);

      const [
        connectionCount,
        accountsCreatedCount,
        serveyPosCount,
        serveyNegaCount,
      ] = await Promise.all([
        User.countDocuments({
          lastLogin: {
            $gte: new Date(dateFormatted),
            $lt: new Date(dateFormatted + "T23:59:59.999Z"),
          },
        }),
        User.countDocuments({
          createdAt: {
            $gte: new Date(dateFormatted),
            $lt: new Date(dateFormatted + "T23:59:59.999Z"),
          },
        }),
        Servey.countDocuments({
          date: {
            $gte: new Date(dateFormatted),
            $lt: new Date(dateFormatted + "T23:59:59.999Z"),
          },
          result: { $eq: 1 },
        }),
        Servey.countDocuments({
          date: {
            $gte: new Date(dateFormatted),
            $lt: new Date(dateFormatted + "T23:59:59.999Z"),
          },
          result: { $eq: 0 },
        }),
      ]);

      connectionCounts.push(connectionCount);
      accountsCreatedCounts.push(accountsCreatedCount);
      serveyPosCounts.push(serveyPosCount);
      serveyNegaCounts.push(serveyNegaCount);
    }

    const updatedData = {
      period: "week",
      connections: connectionCounts,
      accountsCreated: accountsCreatedCounts,
      surveysPos: serveyPosCounts,
      surveysNega: serveyNegaCounts,
    };

    if (!data) {
      updatedData.date = lastWeekFormatted;
    }

    const result = await Stat.findOneAndUpdate(
      { date: lastWeekFormatted },
      updatedData,
      { upsert: true, setDefaultsOnInsert: true, new: true }
    );

    res.status(200).json({
      status: 200,
      message: "Weekly stats calculated and updated!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

exports.WeeklyStats = WeeklyStats;
exports.AllTimeStats = AllTimeStats;
exports.MonthlyStats = MonthlyStats;
exports.DailyStats = DailyStats;
