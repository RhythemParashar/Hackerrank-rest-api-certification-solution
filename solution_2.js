/*
 * Complete the 'getNumDraws' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER year as parameter.
 */

const axios = require('axios');

async function getNumDraws(year) {
  let sum = 0;

  for (let i = 0; i <= 10; i++) {
    let url = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1goals=${i}&team2goals=${i}`;
    sum += await fetchData(url);
  }

  return sum;
}

const fetchData = async (url) => {
  const res = await axios.get(url);

  return res.data.total;
};
