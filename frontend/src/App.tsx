// @ts-nocheck
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import orderTransactions from './orders.json';
import './App.css'
    let dataAnalytics = {};
    const WazirX = () => {
        const [tickers, setTickers] = useState({});
        // const [dataAnalytics, setDataAnalytics] = useState({});

        useEffect(() => {
          const fetch = async () => {
            const respone = await axios.get('https://api.wazirx.com/api/v2/tickers');
            setTickers(respone.data);
          }
          fetch();
        }, [])
        const transactions = orderTransactions.filter((tra) => tra.state === 'done').map((tt) => ({
          ...tt,
          origin_volume: Number(tt.origin_volume),
          avg_price: Number(tt.avg_price),
        }));
        const portfolioCoins = transactions.map((v) => v.market);
        const portfolio = [...new Set(portfolioCoins)];
    
        const getAvgPrice = (coin) => {
            let totalPurchaseAmount = 0;
            let totalAmount = 0;
            const coinTransactions = transactions.filter((transaction) => transaction.market === coin);
            let buyTransactions = coinTransactions.filter((trans) => trans.kind === 'bid');
            let newBuyTransactions = buyTransactions;
            const sellTransactions = coinTransactions.filter((trans) => trans.kind === 'ask');
            let totalSold = 0;
            sellTransactions.map((trr) => {
                totalSold = trr.origin_volume + totalSold;
            });
            buyTransactions.map((tr, index) => {
                if (totalSold) {
                    if (tr.origin_volume > totalSold) {
                        const foundIndex = newBuyTransactions.findIndex((tra) => tra.id === tr.id);
                        newBuyTransactions[foundIndex] = {
                            ...tr,
                            origin_volume: tr.origin_volume - totalSold,
                        }
                        totalSold = 0;
                    }
                    if (tr.origin_volume === totalSold) {
                        newBuyTransactions = newBuyTransactions.filter((r, fi) => fi !== index);
                        totalSold = 0;
                    }
                    if (tr.amount < totalSold) {
                        newBuyTransactions = newBuyTransactions.filter((r, fii) => fii !== index);
                        totalSold = totalSold - tr.origin_volume;
                    }
                }
            });
            // console.log(newBuyTransactions);
            newBuyTransactions.map((transaction) => {
                totalPurchaseAmount = (transaction.origin_volume * transaction.avg_price) + totalPurchaseAmount
                totalAmount = transaction.origin_volume + totalAmount;
            });
            
            dataAnalytics = {
              ...dataAnalytics,
              [coin]: {
                totalPurchaseAmount,
                totalAmount
              }
            };
            
            // transactions.map((transaction) => {
            //     if (transaction.coin === coin) {
            //         if (coin.type === 'buy') {
            //             totalPurchaseAmount = (transaction.amount * transaction.price) + totalPurchaseAmount
            //             totalAmount = transaction.amount + totalAmount;
            //         } else {
            //             totalPurchaseAmount = totalPurchaseAmount - (transaction.amount * transaction.price);
            //             totalAmount = totalAmount - transaction.amount;
            //         }
            //     }
            // });
            return (totalPurchaseAmount/totalAmount) || 0;
        }
        console.log(Object.values(dataAnalytics));
        const totalPL = Object.values(dataAnalytics).reduce((acc, curr) => curr.pl ? acc + curr.pl : acc, 0);
        return (
          <table className="stock-table">
            <caption className="readable-hidden">Stock Information</caption>
            <colgroup>
              <col />
              <col className="table-cell-1of8" span="7" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Coin</th>
                <th scope="col">Avg Cost</th>
                <th scope="col">Current Price</th>
                <th scope="col">Spent</th>
                <th scope="col">Current Value</th>
                <th scope="col">P&L</th>
              </tr>
            </thead>
            <tbody>
              {
                portfolio.map(coin => {
                  const avgCost = getAvgPrice(coin);
                  const spent = dataAnalytics[coin]?.totalPurchaseAmount;
                  const current = tickers[coin]?.last * dataAnalytics[coin]?.totalAmount;
                  const pl = Math.round(current - spent);
                  dataAnalytics = {
                    ...dataAnalytics,
                    [coin]: {
                      ...dataAnalytics[coin],
                      pl: pl,
                    }
                  }
                  return (
                    <tr>
                      <th scope="row">{coin.replace('inr', '')}</th>
                      <td>{avgCost}</td>
                      <td>{tickers[coin]?.last}</td>
                      <td>{spent}</td>
                      <td>{current}</td>
                      <td className={pl > 0 ? 'lower' : 'upper'}>{pl}</td>
                    </tr>
                  )
                }) 
              }
               <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td>{Object.values(dataAnalytics).reduce((acc, cur) => acc + cur.totalPurchaseAmount, 0)}</td>
                  <td></td>
                  <td className={totalPL > 0 ? 'lower' : 'upper'}>{Math.round(totalPL)}</td>
                </tr>
            </tbody>
          </table>
        )
    };

    export default WazirX;