const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');

exports.get_transaction = async function(req, res) {
  let data = await Transaction.find({}).sort({ transactionDate: -1 }).limit(50);
  res.status(200).json(data);
}

exports.income = async function(req, res) {
  let { month } = req.query;
  month = parseInt(month) || new Date().getMonth() + 1;

  const data = await Transaction.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$transactionDate" }, month],
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$transactionDate" },
          month: { $month: "$transactionDate" },
          week: { $week: "$transactionDate" },
        },
        total: { $sum: "$total" },
      },
    },
  ]);

  let total = data.map(t=>({ week: t._id.week, total: t.total })) // change data structure
    .sort((a,b)=>a.week-b.week)   // sort by week
    .map((t,i,a)=>({ ...t, week: t.week-a[0].week+1 })); // count week 1-4(or 5)

  res.status(200).json({ status: 'success', total });
}

exports.count = async function(req, res) {
  const count = await Transaction.count({});
  res.status(200).json({ status: 'success', count });
}