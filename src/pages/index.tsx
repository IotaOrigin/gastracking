import type { NextPage } from 'next';
import Head from 'next/head';
import { useState} from 'react';
import { computeGasUsedByAddress } from '@/utils/gasTracking'
const Form = () => {
  const [state, setState] = useState({
    address: "",
    startTimeStamp: "",
    endTimeStamp: "",
    result: 0,
  });

  function handleChange(e) {
      setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    computeGasUsedByAddress(state.address, state.startTimeStamp, state.endTimeStamp)
      .then((gasUsed) => {
        setState({ ...state, result: gasUsed });
      })
      .catch((e) => {
       console.log(e);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col w-full'>
          <label for="address">Collection Address:</label>
          <input
            name="address"
            type="text"
            onChange={handleChange}
            value={state.address}
            required
          />
      </div>
      <div className='flex flex-col w-full'>
          <label for="startTimeStamp">Start TimeStamp:</label>
          <input
            name="startTimeStamp"
            type="numer"
            onChange={handleChange}
            value={state.startTimeStamp}
            required
          />
      </div>
      <div className='flex flex-col w-full'>
          <label for="endTimeStamp">End TimeStamp:</label>
          <input
            name="endTimeStamp"
            type="number"
            onChange={handleChange}
            value={state.endTimeStamp}
            required
          />
      </div>
      <div className='flex flex-col w-full'>
        <button type="submit">Send</button>
      </div>
      <div className='flex w-full'>
          <label for="result">Gas Used:</label>
          <input
             name="result"
             type="text"
             value={state.result}
             readonly
          />
      </div>
    </form>
  );
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gas Tracking</title>
      </Head>
      <div className="flex flex-col items-center p-24">
        <h1> Gas Tracking </h1>
        <Form/>
      </div>
    </>
  );
};

export default Home;
