import axios from "axios";

const blockExplorerUrl = "https://explorer.evm.testnet.shimmer.network"

export const computeGasUsedByAddress = async (contractAddress: string, start_timestamp : number, end_timestamp: number) => {
  const res = await axios.get(blockExplorerUrl +
                                                     '/api?module=account&action=txlist' +
                                                     '&address=' + contractAddress +
                                                     '&start_timestamp=' + start_timestamp +
                                                     '&end_timestamp=' + end_timestamp);
  let gasUsed = 0;
  if( res.status == 200 ){
     const transactions = res.data.result;
     transactions.map(tx => {
            gasUsed += Number(tx.cumulativeGasUsed) ;
     })
  }
      console.log("gas Used :", gasUsed);
      return gasUsed;
}