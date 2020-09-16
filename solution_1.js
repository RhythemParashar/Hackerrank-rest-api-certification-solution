/*
 * Complete the 'getTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING team
 *  2. INTEGER year
 */

const axios = require('axios');

async function getTotalGoals(team, year) {
  let url = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1=${team}`;
  let url1 = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team2=${team}`;

  let [a, b] = await Promise.all([fetchData(url), fetchData(url1)]);
  let [sum1, sum2] = await Promise.all([
    getDataForUrl1(a, team, year),
    getDataForUrl2(b, team, year),
  ]);
  return sum1 + sum2;
}

const getDataForUrl2 = async (a, team, year) => {
  let totalPages = a.total_pages;

  let sums = 0;

  for (const i of Array(totalPages).keys()) {
    let f = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team2=${team}&page=${
      i + 1
    }`;

    let data = await fetchData(f).then((data) => data.data);

    for (let i = 0; i < data.length; i++) {
      sums += parseInt(data[i].team2goals);
    }
  }

  return sums;
};

const getDataForUrl1 = async (a, team, year) => {
  let totalPages = a.total_pages;

  let sums = 0;

  for (const i of Array(totalPages).keys()) {
    let f = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1=${team}&page=${
      i + 1
    }`;

    let data = await fetchData(f).then((data) => data.data);

    for (let i = 0; i < data.length; i++) {
      sums += parseInt(data[i].team1goals);
    }
  }

  return sums;
};

const fetchData = async (url) => {
  const res = await axios.get(url);
  return res.data;
};
